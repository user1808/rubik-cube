import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  TetrahedronFaces,
  type TTetrahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';

type TPyraminxPieceMapping = Array<{
  pieceIdx: number;
  faces: Array<{ face: TTetrahedronFaces; position: number }>;
}>;

// Tips (single-piece corner rotations)
const TIP_MAPPING_PYRAMINX: TPyraminxPieceMapping = [
  {
    pieceIdx: 0,
    faces: [
      { face: 'Front', position: 0 },
      { face: 'Right', position: 0 },
      { face: 'Left', position: 0 },
    ],
  },
  {
    pieceIdx: 8,
    faces: [
      { face: 'Front', position: 6 },
      { face: 'Left', position: 3 },
      { face: 'Down', position: 0 },
    ],
  },
  {
    pieceIdx: 10,
    faces: [
      { face: 'Front', position: 3 },
      { face: 'Right', position: 6 },
      { face: 'Down', position: 3 },
    ],
  },
  {
    pieceIdx: 12,
    faces: [
      { face: 'Right', position: 3 },
      { face: 'Left', position: 6 },
      { face: 'Down', position: 6 },
    ],
  },
];

// Corner pieces (main tetrahedron corners)
const CORNER_MAPPING_PYRAMINX: TPyraminxPieceMapping = [
  {
    pieceIdx: 1,
    faces: [
      { face: 'Front', position: 1 },
      { face: 'Right', position: 1 },
      { face: 'Left', position: 1 },
    ],
  },
  {
    pieceIdx: 5,
    faces: [
      { face: 'Front', position: 7 },
      { face: 'Left', position: 4 },
      { face: 'Down', position: 1 },
    ],
  },
  {
    pieceIdx: 6,
    faces: [
      { face: 'Front', position: 4 },
      { face: 'Right', position: 7 },
      { face: 'Down', position: 4 },
    ],
  },
  {
    pieceIdx: 7,
    faces: [
      { face: 'Right', position: 4 },
      { face: 'Left', position: 7 },
      { face: 'Down', position: 7 },
    ],
  },
];

// Edge pieces (two-face pieces)
const EDGE_MAPPING_PYRAMINX: TPyraminxPieceMapping = [
  {
    pieceIdx: 2,
    faces: [
      { face: 'Front', position: 8 },
      { face: 'Left', position: 2 },
    ],
  },
  {
    pieceIdx: 3,
    faces: [
      { face: 'Front', position: 2 },
      { face: 'Right', position: 8 },
    ],
  },
  {
    pieceIdx: 4,
    faces: [
      { face: 'Right', position: 2 },
      { face: 'Left', position: 8 },
    ],
  },
  {
    pieceIdx: 9,
    faces: [
      { face: 'Front', position: 5 },
      { face: 'Down', position: 2 },
    ],
  },
  {
    pieceIdx: 11,
    faces: [
      { face: 'Right', position: 5 },
      { face: 'Down', position: 5 },
    ],
  },
  {
    pieceIdx: 13,
    faces: [
      { face: 'Left', position: 5 },
      { face: 'Down', position: 8 },
    ],
  },
];

/**
 * Calculates the parity of a permutation using the number of inversions
 */
function getPermutationParity(arr: number[]): boolean {
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0; // true = even, false = odd
}
/**
 * Finds the orientation of an edge (0 or 1)
 * Orientation is 0 if colors match standard order, 1 if flipped
 */
function getEdgeOrientation(
  edgeColors: [TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor],
): number | null {
  if (edgeColors[0] === standardColors[0] && edgeColors[1] === standardColors[1]) {
    return 0;
  }
  if (edgeColors[0] === standardColors[1] && edgeColors[1] === standardColors[0]) {
    return 1;
  }
  return null;
}

function collectPieceColors(
  logicalValues: Record<string, Array<Nullable<TCubeFaceColor>>>,
  mapping: TPyraminxPieceMapping,
): Array<{ colors: TCubeFaceColor[] }> {
  return mapping.map(({ faces }) => {
    const colors: TCubeFaceColor[] = [];
    for (const { face, position } of faces) {
      const faceValues = logicalValues[face];
      if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
        return { colors: [] };
      }
      colors.push(faceValues[position] as TCubeFaceColor);
    }
    return { colors };
  });
}

function buildPositionToStandardMap(
  mapping: TPyraminxPieceMapping,
  pieces: Array<{ colors: TCubeFaceColor[] }>,
  faceColors: Record<TTetrahedronFaces, TCubeFaceColor>,
): Map<number, number> | null {
  const positionToStandard = new Map<number, number>();
  const usedStandard = new Set<number>();

  for (let pos = 0; pos < mapping.length; pos++) {
    const pieceColors = pieces[pos].colors;
    if (!pieceColors.length) return null;
    const colorKey = [...pieceColors].sort().join(',');

    let standardPos = -1;
    for (let i = 0; i < mapping.length; i++) {
      const stdPiece = mapping[i];
      const stdColors = stdPiece.faces.map(({ face }) => faceColors[face]);
      const stdKey = [...stdColors].sort().join(',');
      if (colorKey === stdKey) {
        standardPos = i;
        break;
      }
    }

    if (standardPos === -1 || usedStandard.has(standardPos)) return null;
    usedStandard.add(standardPos);
    positionToStandard.set(pos, standardPos);
  }

  return positionToStandard;
}

function validateFixedPieceColors(
  mapping: TPyraminxPieceMapping,
  pieces: Array<{ colors: TCubeFaceColor[] }>,
  faceColors: Record<TTetrahedronFaces, TCubeFaceColor>,
  expectedDistinctColors: number,
): boolean {
  for (let i = 0; i < mapping.length; i++) {
    const pieceColors = pieces[i].colors;
    if (!pieceColors.length) return false;
    if (new Set(pieceColors).size !== expectedDistinctColors) return false;

    const standardColors = mapping[i].faces.map(({ face }) => faceColors[face]);
    if (new Set(standardColors).size !== expectedDistinctColors) return false;

    if ([...pieceColors].sort().join(',') !== [...standardColors].sort().join(',')) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if the Pyraminx is solvable
 * Algorithm checks:
 * 1. Tips and corners match their fixed positions (color sets)
 * 2. Parity of edge permutation is even
 * 3. Sum of edge orientations is divisible by 2
 * 4. Valid color distribution (each color appears 9 times)
 *
 * @returns true if the Pyraminx is solvable, false otherwise
 */
export function isPyraminxSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value.Pyraminx;
  if (!logicalValues) return false;

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeProperties = getCurrentCubeProperties.value;
  if (!cubeProperties || cubeProperties.commonName !== 'Pyraminx') return false;
  const cubeFacesMaterials = cubeProperties.piecesMaterials?.cubeFacesMaterials;
  if (!cubeFacesMaterials) return false;

  const faceColors: Record<TTetrahedronFaces, TCubeFaceColor> = {} as Record<
    TTetrahedronFaces,
    TCubeFaceColor
  >;
  for (const face of TetrahedronFaces) {
    const material = cubeFacesMaterials[face];
    if (!material) return false;
    faceColors[face] = material.color;
  }
  if (new Set(Object.values(faceColors)).size !== TetrahedronFaces.length) return false;

  // Validate full color distribution: exactly 9 stickers for each face color
  const colorCounts = new Map<TCubeFaceColor, number>();
  const validColors = new Set(Object.values(faceColors));
  for (const face of TetrahedronFaces) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues.length !== 9) return false;
    for (const color of faceValues) {
      if (color === null || color === undefined) return false;
      if (!validColors.has(color as TCubeFaceColor)) return false;
      colorCounts.set(color as TCubeFaceColor, (colorCounts.get(color as TCubeFaceColor) || 0) + 1);
    }
  }
  for (const color of validColors) {
    if (colorCounts.get(color) !== 9) return false;
  }

  const tips = collectPieceColors(logicalValues, TIP_MAPPING_PYRAMINX);
  const corners = collectPieceColors(logicalValues, CORNER_MAPPING_PYRAMINX);
  const edges = collectPieceColors(logicalValues, EDGE_MAPPING_PYRAMINX);

  const tipsMatchPositions = validateFixedPieceColors(TIP_MAPPING_PYRAMINX, tips, faceColors, 3);
  const cornersMatchPositions = validateFixedPieceColors(
    CORNER_MAPPING_PYRAMINX,
    corners,
    faceColors,
    3,
  );

  const edgePositionToStandard = buildPositionToStandardMap(
    EDGE_MAPPING_PYRAMINX,
    edges,
    faceColors,
  );
  if (!tipsMatchPositions || !cornersMatchPositions || !edgePositionToStandard) return false;

  for (const edge of edges) {
    if (edge.colors.length !== 2) return false;
    if (new Set(edge.colors).size !== 2) return false;
  }

  const edgePermutation: number[] = [];
  for (let i = 0; i < EDGE_MAPPING_PYRAMINX.length; i++) {
    const value = edgePositionToStandard.get(i);
    if (value === undefined) return false;
    edgePermutation.push(value);
  }
  const isEdgePermutationEven = getPermutationParity(edgePermutation);

  let totalEdgeOrientation = 0;
  for (let pos = 0; pos < EDGE_MAPPING_PYRAMINX.length; pos++) {
    const standardPos = edgePositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const standardColors = EDGE_MAPPING_PYRAMINX[standardPos].faces.map(
      ({ face }) => faceColors[face],
    ) as [TCubeFaceColor, TCubeFaceColor];
    const currentColors = edges[pos].colors as [TCubeFaceColor, TCubeFaceColor];
    const orientation = getEdgeOrientation(currentColors, standardColors);
    if (orientation === null) return false;
    totalEdgeOrientation += orientation;
  }

  return (
    tipsMatchPositions &&
    cornersMatchPositions &&
    isEdgePermutationEven &&
    totalEdgeOrientation % 2 === 0
  );
}

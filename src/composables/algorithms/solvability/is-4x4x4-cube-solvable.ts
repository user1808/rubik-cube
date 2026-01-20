import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  HexahedronFaces,
  type THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 4x4x4 cube
// For each corner piece index determines on which faces and positions it is located
const CORNER_MAPPING_4X4: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
}> = [
  // Piece 0: Up-Left-Back
  {
    pieceIdx: 0,
    faces: [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 3 },
    ],
  },
  // Piece 3: Up-Right-Back
  {
    pieceIdx: 3,
    faces: [
      { face: 'Up', position: 3 },
      { face: 'Right', position: 3 },
      { face: 'Back', position: 0 },
    ],
  },
  // Piece 12: Up-Left-Front
  {
    pieceIdx: 12,
    faces: [
      { face: 'Up', position: 12 },
      { face: 'Left', position: 3 },
      { face: 'Front', position: 0 },
    ],
  },
  // Piece 15: Up-Right-Front
  {
    pieceIdx: 15,
    faces: [
      { face: 'Up', position: 15 },
      { face: 'Right', position: 0 },
      { face: 'Front', position: 3 },
    ],
  },
  // Piece 40: Down-Left-Back
  {
    pieceIdx: 40,
    faces: [
      { face: 'Down', position: 12 },
      { face: 'Left', position: 12 },
      { face: 'Back', position: 15 },
    ],
  },
  // Piece 43: Down-Right-Back
  {
    pieceIdx: 43,
    faces: [
      { face: 'Down', position: 15 },
      { face: 'Right', position: 15 },
      { face: 'Back', position: 12 },
    ],
  },
  // Piece 52: Down-Left-Front
  {
    pieceIdx: 52,
    faces: [
      { face: 'Down', position: 0 },
      { face: 'Left', position: 15 },
      { face: 'Front', position: 12 },
    ],
  },
  // Piece 55: Down-Right-Front
  {
    pieceIdx: 55,
    faces: [
      { face: 'Down', position: 3 },
      { face: 'Right', position: 12 },
      { face: 'Front', position: 15 },
    ],
  },
];

// Mapping of edges for 4x4x4 cube
// For each edge piece index determines on which faces and positions it is located
// Note: In 4x4x4, edges come in pairs (24 edges total, 12 pairs)
const EDGE_MAPPING_4X4: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
}> = [
  // Piece 1: Up-Back (outer)
  {
    pieceIdx: 1,
    faces: [
      { face: 'Up', position: 1 },
      { face: 'Back', position: 2 },
    ],
  },
  // Piece 2: Up-Back (inner)
  {
    pieceIdx: 2,
    faces: [
      { face: 'Up', position: 2 },
      { face: 'Back', position: 1 },
    ],
  },
  // Piece 4: Up-Left (outer)
  {
    pieceIdx: 4,
    faces: [
      { face: 'Up', position: 4 },
      { face: 'Left', position: 1 },
    ],
  },
  // Piece 8: Up-Left (inner)
  {
    pieceIdx: 8,
    faces: [
      { face: 'Up', position: 8 },
      { face: 'Left', position: 2 },
    ],
  },
  // Piece 7: Up-Right (outer)
  {
    pieceIdx: 7,
    faces: [
      { face: 'Up', position: 7 },
      { face: 'Right', position: 2 },
    ],
  },
  // Piece 11: Up-Right (inner)
  {
    pieceIdx: 11,
    faces: [
      { face: 'Up', position: 11 },
      { face: 'Right', position: 1 },
    ],
  },
  // Piece 13: Up-Front (outer)
  {
    pieceIdx: 13,
    faces: [
      { face: 'Up', position: 13 },
      { face: 'Front', position: 1 },
    ],
  },
  // Piece 14: Up-Front (inner)
  {
    pieceIdx: 14,
    faces: [
      { face: 'Up', position: 14 },
      { face: 'Front', position: 2 },
    ],
  },
  // Piece 16: Left-Back (outer)
  {
    pieceIdx: 16,
    faces: [
      { face: 'Left', position: 4 },
      { face: 'Back', position: 7 },
    ],
  },
  // Piece 28: Left-Back (inner)
  {
    pieceIdx: 28,
    faces: [
      { face: 'Left', position: 8 },
      { face: 'Back', position: 11 },
    ],
  },
  // Piece 19: Right-Back (outer)
  {
    pieceIdx: 19,
    faces: [
      { face: 'Right', position: 7 },
      { face: 'Back', position: 4 },
    ],
  },
  // Piece 31: Right-Back (inner)
  {
    pieceIdx: 31,
    faces: [
      { face: 'Right', position: 11 },
      { face: 'Back', position: 8 },
    ],
  },
  // Piece 24: Left-Front (outer)
  {
    pieceIdx: 24,
    faces: [
      { face: 'Left', position: 7 },
      { face: 'Front', position: 4 },
    ],
  },
  // Piece 36: Left-Front (inner)
  {
    pieceIdx: 36,
    faces: [
      { face: 'Left', position: 11 },
      { face: 'Front', position: 8 },
    ],
  },
  // Piece 27: Right-Front (outer)
  {
    pieceIdx: 27,
    faces: [
      { face: 'Right', position: 4 },
      { face: 'Front', position: 7 },
    ],
  },
  // Piece 39: Right-Front (inner)
  {
    pieceIdx: 39,
    faces: [
      { face: 'Right', position: 8 },
      { face: 'Front', position: 11 },
    ],
  },
  // Piece 41: Down-Back (outer)
  {
    pieceIdx: 41,
    faces: [
      { face: 'Down', position: 13 },
      { face: 'Back', position: 14 },
    ],
  },
  // Piece 42: Down-Back (inner)
  {
    pieceIdx: 42,
    faces: [
      { face: 'Down', position: 14 },
      { face: 'Back', position: 13 },
    ],
  },
  // Piece 44: Down-Left (outer)
  {
    pieceIdx: 44,
    faces: [
      { face: 'Down', position: 8 },
      { face: 'Left', position: 13 },
    ],
  },
  // Piece 48: Down-Left (inner)
  {
    pieceIdx: 48,
    faces: [
      { face: 'Down', position: 4 },
      { face: 'Left', position: 14 },
    ],
  },
  // Piece 51: Down-Right (outer)
  {
    pieceIdx: 51,
    faces: [
      { face: 'Down', position: 7 },
      { face: 'Right', position: 13 },
    ],
  },
  // Piece 47: Down-Right (inner)
  {
    pieceIdx: 47,
    faces: [
      { face: 'Down', position: 11 },
      { face: 'Right', position: 14 },
    ],
  },
  // Piece 53: Down-Front (outer)
  {
    pieceIdx: 53,
    faces: [
      { face: 'Down', position: 1 },
      { face: 'Front', position: 13 },
    ],
  },
  // Piece 54: Down-Front (inner)
  {
    pieceIdx: 54,
    faces: [
      { face: 'Down', position: 2 },
      { face: 'Front', position: 14 },
    ],
  },
];

/**
 * Finds the orientation of a corner (0, 1, or 2)
 * Orientation is the number of rotations needed to match the colors to the standard order
 */
function getCornerOrientation(
  cornerColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
): number | null {
  // Check all possible rotations (0, 1, 2)
  for (let rotation = 0; rotation < 3; rotation++) {
    const rotated = [
      cornerColors[rotation % 3],
      cornerColors[(rotation + 1) % 3],
      cornerColors[(rotation + 2) % 3],
    ];
    if (
      rotated[0] === standardColors[0] &&
      rotated[1] === standardColors[1] &&
      rotated[2] === standardColors[2]
    ) {
      return rotation;
    }
  }
  return null; // No valid rotation found
}

/**
 * Checks if the 4x4x4 cube is solvable
 * Algorithm checks:
 * 1. Valid corner permutation (all 8 unique corners)
 * 2. Sum of the corner orientations (must be divisible by 3)
 * 3. Valid edge color pairs (two of each adjacent face pair)
 * 4. Valid color distribution (each color appears 16 times)
 *
 * @returns true if the cube is solvable, false otherwise
 */
export function is4x4x4CubeSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value['4x4x4 Cube'];
  if (!logicalValues) return false;

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeProperties = getCurrentCubeProperties.value;
  if (!cubeProperties || cubeProperties.commonName !== '4x4x4 Cube') return false;
  const cubeFacesMaterials = cubeProperties.piecesMaterials?.cubeFacesMaterials;
  if (!cubeFacesMaterials) return false;

  // 1. Collect the colors of all corners
  const corners: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
  }> = [];
  const cornersByPosition = new Map<
    number,
    {
      pieceIdx: number;
      colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
    }
  >();

  for (const corner of CORNER_MAPPING_4X4) {
    const colors: TCubeFaceColor[] = [];
    for (const { face, position } of corner.faces) {
      const faceValues = logicalValues[face];
      if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
        return false; // Missing data
      }
      colors.push(faceValues[position] as TCubeFaceColor);
    }
    if (new Set(colors).size !== 3) return false; // Corner must have 3 distinct colors
    const cornerEntry = {
      pieceIdx: corner.pieceIdx,
      colors: [colors[0], colors[1], colors[2]] as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
    };
    corners.push(cornerEntry);
    cornersByPosition.set(corner.pieceIdx, cornerEntry);
  }

  // 2. Collect the colors of all edges
  const edges: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor];
  }> = [];

  for (const edge of EDGE_MAPPING_4X4) {
    const colors: TCubeFaceColor[] = [];
    for (const { face, position } of edge.faces) {
      const faceValues = logicalValues[face];
      if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
        return false; // Missing data
      }
      colors.push(faceValues[position] as TCubeFaceColor);
    }
    if (new Set(colors).size !== 2) return false; // Edge must have 2 distinct colors
    const edgeEntry = {
      pieceIdx: edge.pieceIdx,
      colors: [colors[0], colors[1]] as [TCubeFaceColor, TCubeFaceColor],
    };
    edges.push(edgeEntry);
  }

  // 3. Determine the standard colors based on the cube's configured face colors
  const faceColors: Record<THexahedronFaces, TCubeFaceColor> = {} as Record<
    THexahedronFaces,
    TCubeFaceColor
  >;
  for (const face of HexahedronFaces) {
    const material = cubeFacesMaterials[face];
    if (!material) return false;
    faceColors[face] = material.color;
  }
  if (new Set(Object.values(faceColors)).size !== HexahedronFaces.length) return false;

  // Validate full color distribution: exactly 16 stickers for each face color
  const colorCounts = new Map<TCubeFaceColor, number>();
  const validColors = new Set(Object.values(faceColors));
  for (const face of HexahedronFaces) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues.length !== 16) return false;
    for (const color of faceValues) {
      if (color === null || color === undefined) return false;
      if (!validColors.has(color as TCubeFaceColor)) return false;
      colorCounts.set(color as TCubeFaceColor, (colorCounts.get(color as TCubeFaceColor) || 0) + 1);
    }
  }
  for (const color of validColors) {
    if (colorCounts.get(color) !== 16) return false;
  }

  // 4. Build a map: which corner (by colors) should be on which position
  const cornerPositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < CORNER_MAPPING_4X4.length; pos++) {
    const corner = cornersByPosition.get(CORNER_MAPPING_4X4[pos].pieceIdx);
    if (!corner) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...corner.colors].sort().join(',');

    // Find the standard position of this corner based on the colors
    let standardPos = -1;
    for (let i = 0; i < CORNER_MAPPING_4X4.length; i++) {
      const stdCorner = CORNER_MAPPING_4X4[i];
      const stdColors: TCubeFaceColor[] = [];
      for (const { face } of stdCorner.faces) {
        if (faceColors[face] !== undefined) stdColors.push(faceColors[face]);
      }
      if (stdColors.length !== 3) return false;
      const stdColorKey = [...stdColors].sort().join(',');
      if (colorKey === stdColorKey) {
        standardPos = i;
        break;
      }
    }

    if (standardPos === -1) return false; // No suitable corner found
    cornerPositionToStandard.set(pos, standardPos);
  }
  const seenCorners = new Set<number>();
  for (let i = 0; i < CORNER_MAPPING_4X4.length; i++) {
    const value = cornerPositionToStandard.get(i);
    if (value === undefined) return false;
    if (seenCorners.has(value)) return false; // Duplicate corner piece -> invalid state
    seenCorners.add(value);
  }

  // 5. Validate that edges only use allowed adjacent face color pairs
  const allowedEdgePairs = new Set<string>();
  for (const edge of EDGE_MAPPING_4X4) {
    const stdColors: TCubeFaceColor[] = [];
    for (const { face } of edge.faces) {
      if (faceColors[face] !== undefined) stdColors.push(faceColors[face]);
    }
    if (stdColors.length !== 2) return false;
    allowedEdgePairs.add([...stdColors].sort().join(','));
  }
  for (const edge of edges) {
    const pairKey = [...edge.colors].sort().join(',');
    if (!allowedEdgePairs.has(pairKey)) return false;
  }

  // 7. Calculate the sum of the corner orientations
  let totalCornerOrientation = 0;
  for (let pos = 0; pos < CORNER_MAPPING_4X4.length; pos++) {
    const corner = cornersByPosition.get(CORNER_MAPPING_4X4[pos].pieceIdx);
    if (!corner) return false;

    const standardPos = cornerPositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_4X4[standardPos];
    const standardColors: TCubeFaceColor[] = [];
    for (const { face } of stdCorner.faces) {
      if (faceColors[face] !== undefined) standardColors.push(faceColors[face]);
    }
    if (standardColors.length !== 3) return false;

    // Find the orientation (rotation) needed to match
    const orientation = getCornerOrientation(corner.colors, [
      standardColors[0],
      standardColors[1],
      standardColors[2],
    ] as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor]);
    if (orientation === null) return false;
    totalCornerOrientation += orientation;
  }

  // 8. Validate that edge color pairs match the expected multiset (two per adjacent face pair)
  const expectedEdgePairCounts = new Map<string, number>();
  for (const edge of EDGE_MAPPING_4X4) {
    const stdColors: TCubeFaceColor[] = [];
    for (const { face } of edge.faces) {
      if (faceColors[face] !== undefined) stdColors.push(faceColors[face]);
    }
    if (stdColors.length !== 2) return false;
    const key = [...stdColors].sort().join(',');
    expectedEdgePairCounts.set(key, (expectedEdgePairCounts.get(key) || 0) + 1);
  }
  const actualEdgePairCounts = new Map<string, number>();
  for (const edge of edges) {
    const key = [...edge.colors].sort().join(',');
    actualEdgePairCounts.set(key, (actualEdgePairCounts.get(key) || 0) + 1);
  }
  for (const [key, expectedCount] of expectedEdgePairCounts) {
    if (actualEdgePairCounts.get(key) !== expectedCount) return false;
  }

  // 9. The cube is solvable if:
  // - Sum of the corner orientations is divisible by 3
  return totalCornerOrientation % 3 === 0;
}

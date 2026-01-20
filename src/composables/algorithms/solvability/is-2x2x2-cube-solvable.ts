import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  HexahedronFaces,
  type THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 2x2x2 cube
// For each piece index (0-7) determines on which faces and positions it is located
const CORNER_MAPPING_2X2: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
}> = [
  // Piece 0: Up-Left-Back
  {
    pieceIdx: 0,
    faces: [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 1 },
    ],
  },
  // Piece 1: Up-Right-Back
  {
    pieceIdx: 1,
    faces: [
      { face: 'Up', position: 1 },
      { face: 'Right', position: 1 },
      { face: 'Back', position: 0 },
    ],
  },
  // Piece 2: Up-Left-Front
  {
    pieceIdx: 2,
    faces: [
      { face: 'Up', position: 2 },
      { face: 'Left', position: 1 },
      { face: 'Front', position: 0 },
    ],
  },
  // Piece 3: Up-Right-Front
  {
    pieceIdx: 3,
    faces: [
      { face: 'Up', position: 3 },
      { face: 'Right', position: 0 },
      { face: 'Front', position: 1 },
    ],
  },
  // Piece 4: Down-Left-Back
  {
    pieceIdx: 4,
    faces: [
      { face: 'Down', position: 2 },
      { face: 'Left', position: 2 },
      { face: 'Back', position: 3 },
    ],
  },
  // Piece 5: Down-Right-Back
  {
    pieceIdx: 5,
    faces: [
      { face: 'Down', position: 3 },
      { face: 'Right', position: 3 },
      { face: 'Back', position: 2 },
    ],
  },
  // Piece 6: Down-Left-Front
  {
    pieceIdx: 6,
    faces: [
      { face: 'Down', position: 0 },
      { face: 'Left', position: 3 },
      { face: 'Front', position: 2 },
    ],
  },
  // Piece 7: Down-Right-Front
  {
    pieceIdx: 7,
    faces: [
      { face: 'Down', position: 1 },
      { face: 'Right', position: 2 },
      { face: 'Front', position: 3 },
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
 * Checks if the 2x2x2 cube is solvable
 * Algorithm checks:
 * 1. Valid corner permutation (all 8 unique corners)
 * 2. Sum of the corner orientations (must be divisible by 3)
 *
 * @param logicalValues - Map of the cube faces with colors at each position
 * @returns true if the cube is solvable, false otherwise
 */
export function is2x2x2CubeSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value['2x2x2 Cube'];
  if (!logicalValues) return false;

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeProperties = getCurrentCubeProperties.value;
  if (!cubeProperties || cubeProperties.commonName !== '2x2x2 Cube') return false;
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

  for (const corner of CORNER_MAPPING_2X2) {
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

  // 2. Determine the standard colors based on the cube's configured face colors
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

  // Validate full color distribution: exactly 4 stickers for each face color
  const colorCounts = new Map<TCubeFaceColor, number>();
  const validColors = new Set(Object.values(faceColors));
  for (const face of HexahedronFaces) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues.length !== 4) return false;
    for (const color of faceValues) {
      if (color === null || color === undefined) return false;
      if (!validColors.has(color as TCubeFaceColor)) return false;
      colorCounts.set(color as TCubeFaceColor, (colorCounts.get(color as TCubeFaceColor) || 0) + 1);
    }
  }
  for (const color of validColors) {
    if (colorCounts.get(color) !== 4) return false;
  }

  // 3. Build a map: which corner (by colors) should be on which position
  const positionToCorner = new Map<number, number>();

  // For each position (0-7), find which corner (by colors) is there
  for (let pos = 0; pos < 8; pos++) {
    const corner = corners.find((c) => c.pieceIdx === pos);
    if (!corner) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...corner.colors].sort().join(',');

    // Find the standard position of this corner based on the colors
    let standardPos = -1;
    for (let i = 0; i < CORNER_MAPPING_2X2.length; i++) {
      const stdCorner = CORNER_MAPPING_2X2[i];
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
    positionToCorner.set(pos, standardPos);
  }

  // 4. Validate that the corner permutation is a bijection
  const permutation: number[] = [];
  const seen = new Set<number>();
  for (let i = 0; i < 8; i++) {
    const value = positionToCorner.get(i);
    if (value === undefined) return false;
    if (seen.has(value)) return false; // Duplicate corner piece -> invalid state
    seen.add(value);
    permutation.push(value);
  }

  // 5. Calculate the sum of the corner orientations
  let totalOrientation = 0;
  for (let pos = 0; pos < 8; pos++) {
    const corner = cornersByPosition.get(pos);
    if (!corner) return false;

    const standardPos = positionToCorner.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_2X2[standardPos];
    const standardColors: TCubeFaceColor[] = [];
    for (const { face } of stdCorner.faces) {
      if (faceColors[face] !== undefined) standardColors.push(faceColors[face]);
    }

    // Find the orientation (rotation) needed to match
    const orientation = getCornerOrientation(corner.colors, [
      standardColors[0],
      standardColors[1],
      standardColors[2],
    ] as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor]);
    if (orientation === null) return false;
    totalOrientation += orientation;
  }

  // 6. The cube is solvable if:
  // - Sum of the orientations is divisible by 3
  return totalOrientation % 3 === 0;
}

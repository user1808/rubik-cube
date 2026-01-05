import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 2x2x2 cube
// For each piece index (0-7) determines on which faces and positions it is located
const CORNER_MAPPING_2X2: Array<{
  pieceIdx: number;
  faces: Array<{ face: string; position: number }>;
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
 * Finds the orientation of a corner (0, 1, or 2)
 * Orientation is the number of rotations needed to match the colors to the standard order
 */
function getCornerOrientation(
  cornerColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
): number {
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
  return 0; // Default 0 if no match is found
}

/**
 * Checks if the 2x2x2 cube is solvable
 * Algorithm checks:
 * 1. Parity of the corner permutations
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

  // 1. Collect the colors of all corners
  const corners: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
  }> = [];

  for (const corner of CORNER_MAPPING_2X2) {
    const colors: TCubeFaceColor[] = [];
    for (const { face, position } of corner.faces) {
      const faceValues = logicalValues[face];
      if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
        return false; // Missing data
      }
      colors.push(faceValues[position] as TCubeFaceColor);
    }
    corners.push({
      pieceIdx: corner.pieceIdx,
      colors: [colors[0], colors[1], colors[2]] as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
    });
  }

  // 2. Determine the standard colors based on the most common colors on each face
  // (assuming that each face has one dominant color)
  const faceColors: Record<string, TCubeFaceColor> = {};
  for (const face of ['Up', 'Down', 'Left', 'Right', 'Front', 'Back']) {
    const faceValues = logicalValues[face];
    if (!faceValues) return false;

    // Find the most common color on the face (this should be the base color)
    const colorCounts = new Map<TCubeFaceColor, number>();
    for (const color of faceValues) {
      if (color !== null) {
        colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      }
    }

    let maxCount = 0;
    let mostCommonColor: TCubeFaceColor | null = null;
    for (const [color, count] of colorCounts) {
      if (count > maxCount) {
        maxCount = count;
        mostCommonColor = color;
      }
    }

    if (mostCommonColor === null) return false;
    faceColors[face] = mostCommonColor;
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
        stdColors.push(faceColors[face]);
      }
      const stdColorKey = [...stdColors].sort().join(',');
      if (colorKey === stdColorKey) {
        standardPos = i;
        break;
      }
    }

    if (standardPos === -1) return false; // No suitable corner found
    positionToCorner.set(pos, standardPos);
  }

  // 4. Check the parity of the permutation
  const permutation = Array.from({ length: 8 }, (_, i) => positionToCorner.get(i) || 0);
  const isPermutationEven = getPermutationParity(permutation);

  // 5. Calculate the sum of the corner orientations
  let totalOrientation = 0;
  for (let pos = 0; pos < 8; pos++) {
    const corner = corners.find((c) => c.pieceIdx === pos);
    if (!corner) return false;

    const standardPos = positionToCorner.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_2X2[standardPos];
    const standardColors: TCubeFaceColor[] = [];
    for (const { face } of stdCorner.faces) {
      standardColors.push(faceColors[face]);
    }

    // Find the orientation (rotation) needed to match
    const orientation = getCornerOrientation(corner.colors, [
      standardColors[0],
      standardColors[1],
      standardColors[2],
    ] as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor]);
    totalOrientation += orientation;
  }

  // 6. The cube is solvable if:
  // - Permutation is even
  // - Sum of the orientations is divisible by 3
  return isPermutationEven && totalOrientation % 3 === 0;
}

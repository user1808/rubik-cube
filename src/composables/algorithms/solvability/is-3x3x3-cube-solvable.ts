import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 3x3x3 cube
// For each corner piece index determines on which faces and positions it is located
const CORNER_MAPPING_3X3: Array<{
  pieceIdx: number;
  faces: Array<{ face: string; position: number }>;
}> = [
  // Piece 0: Up-Left-Back
  {
    pieceIdx: 0,
    faces: [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 2 },
    ],
  },
  // Piece 2: Up-Right-Back
  {
    pieceIdx: 2,
    faces: [
      { face: 'Up', position: 2 },
      { face: 'Right', position: 2 },
      { face: 'Back', position: 0 },
    ],
  },
  // Piece 6: Up-Left-Front
  {
    pieceIdx: 6,
    faces: [
      { face: 'Up', position: 6 },
      { face: 'Left', position: 2 },
      { face: 'Front', position: 0 },
    ],
  },
  // Piece 8: Up-Right-Front
  {
    pieceIdx: 8,
    faces: [
      { face: 'Up', position: 8 },
      { face: 'Right', position: 0 },
      { face: 'Front', position: 2 },
    ],
  },
  // Piece 17: Down-Left-Back
  {
    pieceIdx: 17,
    faces: [
      { face: 'Down', position: 6 },
      { face: 'Left', position: 6 },
      { face: 'Back', position: 8 },
    ],
  },
  // Piece 19: Down-Right-Back
  {
    pieceIdx: 19,
    faces: [
      { face: 'Down', position: 8 },
      { face: 'Right', position: 8 },
      { face: 'Back', position: 6 },
    ],
  },
  // Piece 23: Down-Left-Front
  {
    pieceIdx: 23,
    faces: [
      { face: 'Down', position: 0 },
      { face: 'Left', position: 8 },
      { face: 'Front', position: 6 },
    ],
  },
  // Piece 25: Down-Right-Front
  {
    pieceIdx: 25,
    faces: [
      { face: 'Down', position: 2 },
      { face: 'Right', position: 6 },
      { face: 'Front', position: 8 },
    ],
  },
];

// Mapping of edges for 3x3x3 cube
// For each edge piece index determines on which faces and positions it is located
const EDGE_MAPPING_3X3: Array<{
  pieceIdx: number;
  faces: Array<{ face: string; position: number }>;
}> = [
  // Piece 1: Up-Back
  {
    pieceIdx: 1,
    faces: [
      { face: 'Up', position: 1 },
      { face: 'Back', position: 1 },
    ],
  },
  // Piece 3: Up-Left
  {
    pieceIdx: 3,
    faces: [
      { face: 'Up', position: 3 },
      { face: 'Left', position: 1 },
    ],
  },
  // Piece 5: Up-Right
  {
    pieceIdx: 5,
    faces: [
      { face: 'Up', position: 5 },
      { face: 'Right', position: 1 },
    ],
  },
  // Piece 7: Up-Front
  {
    pieceIdx: 7,
    faces: [
      { face: 'Up', position: 7 },
      { face: 'Front', position: 1 },
    ],
  },
  // Piece 9: Left-Back
  {
    pieceIdx: 9,
    faces: [
      { face: 'Left', position: 3 },
      { face: 'Back', position: 5 },
    ],
  },
  // Piece 11: Right-Back
  {
    pieceIdx: 11,
    faces: [
      { face: 'Right', position: 5 },
      { face: 'Back', position: 3 },
    ],
  },
  // Piece 14: Left-Front
  {
    pieceIdx: 14,
    faces: [
      { face: 'Left', position: 5 },
      { face: 'Front', position: 3 },
    ],
  },
  // Piece 16: Right-Front
  {
    pieceIdx: 16,
    faces: [
      { face: 'Right', position: 3 },
      { face: 'Front', position: 5 },
    ],
  },
  // Piece 18: Down-Back
  {
    pieceIdx: 18,
    faces: [
      { face: 'Down', position: 7 },
      { face: 'Back', position: 7 },
    ],
  },
  // Piece 20: Down-Left
  {
    pieceIdx: 20,
    faces: [
      { face: 'Down', position: 3 },
      { face: 'Left', position: 7 },
    ],
  },
  // Piece 22: Down-Right
  {
    pieceIdx: 22,
    faces: [
      { face: 'Down', position: 5 },
      { face: 'Right', position: 7 },
    ],
  },
  // Piece 24: Down-Front
  {
    pieceIdx: 24,
    faces: [
      { face: 'Down', position: 1 },
      { face: 'Front', position: 7 },
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
 * Finds the orientation of an edge (0 or 1)
 * Orientation is 0 if colors match standard order, 1 if flipped
 */
function getEdgeOrientation(
  edgeColors: [TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor],
): number {
  // Check if colors match in order (orientation 0)
  if (edgeColors[0] === standardColors[0] && edgeColors[1] === standardColors[1]) {
    return 0;
  }
  // Check if colors match flipped (orientation 1)
  if (edgeColors[0] === standardColors[1] && edgeColors[1] === standardColors[0]) {
    return 1;
  }
  return 0; // Default 0 if no match is found
}

/**
 * Checks if the 3x3x3 cube is solvable
 * Algorithm checks:
 * 1. Parity of the corner permutations
 * 2. Sum of the corner orientations (must be divisible by 3)
 * 3. Parity of the edge permutations
 * 4. Sum of the edge orientations (must be divisible by 2)
 * 5. Corner and edge permutation parities must match
 *
 * @param logicalValues - Map of the cube faces with colors at each position
 * @returns true if the cube is solvable, false otherwise
 */
export function is3x3x3CubeSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value['3x3x3 Cube'];
  if (!logicalValues) return false;

  // 1. Collect the colors of all corners
  const corners: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
  }> = [];

  for (const corner of CORNER_MAPPING_3X3) {
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

  // 2. Collect the colors of all edges
  const edges: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor];
  }> = [];

  for (const edge of EDGE_MAPPING_3X3) {
    const colors: TCubeFaceColor[] = [];
    for (const { face, position } of edge.faces) {
      const faceValues = logicalValues[face];
      if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
        return false; // Missing data
      }
      colors.push(faceValues[position] as TCubeFaceColor);
    }
    edges.push({
      pieceIdx: edge.pieceIdx,
      colors: [colors[0], colors[1]] as [TCubeFaceColor, TCubeFaceColor],
    });
  }

  // 3. Determine the standard colors based on the most common colors on each face
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

  // 4. Build a map: which corner (by colors) should be on which position
  const cornerPositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < CORNER_MAPPING_3X3.length; pos++) {
    const corner = corners.find((c) => c.pieceIdx === CORNER_MAPPING_3X3[pos].pieceIdx);
    if (!corner) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...corner.colors].sort().join(',');

    // Find the standard position of this corner based on the colors
    let standardPos = -1;
    for (let i = 0; i < CORNER_MAPPING_3X3.length; i++) {
      const stdCorner = CORNER_MAPPING_3X3[i];
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
    cornerPositionToStandard.set(pos, standardPos);
  }

  // 5. Build a map: which edge (by colors) should be on which position
  const edgePositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < EDGE_MAPPING_3X3.length; pos++) {
    const edge = edges.find((e) => e.pieceIdx === EDGE_MAPPING_3X3[pos].pieceIdx);
    if (!edge) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...edge.colors].sort().join(',');

    // Find the standard position of this edge based on the colors
    let standardPos = -1;
    for (let i = 0; i < EDGE_MAPPING_3X3.length; i++) {
      const stdEdge = EDGE_MAPPING_3X3[i];
      const stdColors: TCubeFaceColor[] = [];
      for (const { face } of stdEdge.faces) {
        stdColors.push(faceColors[face]);
      }
      const stdColorKey = [...stdColors].sort().join(',');
      if (colorKey === stdColorKey) {
        standardPos = i;
        break;
      }
    }

    if (standardPos === -1) return false; // No suitable edge found
    edgePositionToStandard.set(pos, standardPos);
  }

  // 6. Check the parity of the corner permutation
  const cornerPermutation = Array.from(
    { length: CORNER_MAPPING_3X3.length },
    (_, i) => cornerPositionToStandard.get(i) || 0,
  );
  const isCornerPermutationEven = getPermutationParity(cornerPermutation);

  // 7. Check the parity of the edge permutation
  const edgePermutation = Array.from(
    { length: EDGE_MAPPING_3X3.length },
    (_, i) => edgePositionToStandard.get(i) || 0,
  );
  const isEdgePermutationEven = getPermutationParity(edgePermutation);

  // 8. Calculate the sum of the corner orientations
  let totalCornerOrientation = 0;
  for (let pos = 0; pos < CORNER_MAPPING_3X3.length; pos++) {
    const corner = corners.find((c) => c.pieceIdx === CORNER_MAPPING_3X3[pos].pieceIdx);
    if (!corner) return false;

    const standardPos = cornerPositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_3X3[standardPos];
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
    totalCornerOrientation += orientation;
  }

  // 9. Calculate the sum of the edge orientations
  let totalEdgeOrientation = 0;
  for (let pos = 0; pos < EDGE_MAPPING_3X3.length; pos++) {
    const edge = edges.find((e) => e.pieceIdx === EDGE_MAPPING_3X3[pos].pieceIdx);
    if (!edge) return false;

    const standardPos = edgePositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdEdge = EDGE_MAPPING_3X3[standardPos];
    const standardColors: TCubeFaceColor[] = [];
    for (const { face } of stdEdge.faces) {
      standardColors.push(faceColors[face]);
    }

    // Find the orientation needed to match
    const orientation = getEdgeOrientation(edge.colors, [standardColors[0], standardColors[1]] as [
      TCubeFaceColor,
      TCubeFaceColor,
    ]);
    totalEdgeOrientation += orientation;
  }

  // 10. The cube is solvable if:
  // - Corner and edge permutation parities must match (both even or both odd)
  // - Sum of the corner orientations is divisible by 3
  // - Sum of the edge orientations is divisible by 2
  return (
    isCornerPermutationEven === isEdgePermutationEven &&
    totalCornerOrientation % 3 === 0 &&
    totalEdgeOrientation % 2 === 0
  );
}

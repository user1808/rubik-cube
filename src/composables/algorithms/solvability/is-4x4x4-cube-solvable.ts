import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 4x4x4 cube
// For each corner piece index determines on which faces and positions it is located
const CORNER_MAPPING_4X4: Array<{
  pieceIdx: number;
  faces: Array<{ face: string; position: number }>;
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
  faces: Array<{ face: string; position: number }>;
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
      { face: 'Left', position: 6 },
      { face: 'Front', position: 5 },
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
      { face: 'Right', position: 5 },
      { face: 'Front', position: 6 },
    ],
  },
  // Piece 28: Left-Back (middle, outer)
  {
    pieceIdx: 28,
    faces: [
      { face: 'Left', position: 8 },
      { face: 'Back', position: 11 },
    ],
  },
  // Piece 32: Left-Back (middle, inner)
  {
    pieceIdx: 32,
    faces: [
      { face: 'Left', position: 9 },
      { face: 'Back', position: 10 },
    ],
  },
  // Piece 31: Right-Back (middle, outer)
  {
    pieceIdx: 31,
    faces: [
      { face: 'Right', position: 11 },
      { face: 'Back', position: 8 },
    ],
  },
  // Piece 35: Right-Back (middle, inner)
  {
    pieceIdx: 35,
    faces: [
      { face: 'Right', position: 10 },
      { face: 'Back', position: 9 },
    ],
  },
  // Piece 36: Left-Front (middle, outer)
  {
    pieceIdx: 36,
    faces: [
      { face: 'Left', position: 11 },
      { face: 'Front', position: 8 },
    ],
  },
  // Piece 34: Left-Front (middle, inner)
  {
    pieceIdx: 34,
    faces: [
      { face: 'Left', position: 10 },
      { face: 'Front', position: 9 },
    ],
  },
  // Piece 39: Right-Front (middle, outer)
  {
    pieceIdx: 39,
    faces: [
      { face: 'Right', position: 8 },
      { face: 'Front', position: 11 },
    ],
  },
  // Piece 33: Right-Front (middle, inner)
  {
    pieceIdx: 33,
    faces: [
      { face: 'Right', position: 9 },
      { face: 'Front', position: 10 },
    ],
  },
  // Piece 41: Down-Back (outer)
  {
    pieceIdx: 41,
    faces: [
      { face: 'Down', position: 13 },
      { face: 'Back', position: 13 },
    ],
  },
  // Piece 42: Down-Back (inner)
  {
    pieceIdx: 42,
    faces: [
      { face: 'Down', position: 14 },
      { face: 'Back', position: 14 },
    ],
  },
  // Piece 44: Down-Left (outer)
  {
    pieceIdx: 44,
    faces: [
      { face: 'Down', position: 4 },
      { face: 'Left', position: 13 },
    ],
  },
  // Piece 48: Down-Left (inner)
  {
    pieceIdx: 48,
    faces: [
      { face: 'Down', position: 8 },
      { face: 'Left', position: 14 },
    ],
  },
  // Piece 51: Down-Right (outer)
  {
    pieceIdx: 51,
    faces: [
      { face: 'Down', position: 11 },
      { face: 'Right', position: 13 },
    ],
  },
  // Piece 47: Down-Right (inner)
  {
    pieceIdx: 47,
    faces: [
      { face: 'Down', position: 7 },
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

// Mapping of centers for 4x4x4 cube
// For each center piece index determines on which face and position it is located
// Note: In 4x4x4, there are 24 centers (4 per face, 6 faces)
const CENTER_MAPPING_4X4: Array<{
  pieceIdx: number;
  face: string;
  position: number;
}> = [
  // Up face centers
  { pieceIdx: 5, face: 'Up', position: 5 },
  { pieceIdx: 6, face: 'Up', position: 6 },
  { pieceIdx: 9, face: 'Up', position: 9 },
  { pieceIdx: 10, face: 'Up', position: 10 },
  // Down face centers
  { pieceIdx: 49, face: 'Down', position: 5 },
  { pieceIdx: 50, face: 'Down', position: 6 },
  { pieceIdx: 45, face: 'Down', position: 9 },
  { pieceIdx: 46, face: 'Down', position: 10 },
  // Front face centers
  { pieceIdx: 25, face: 'Front', position: 5 },
  { pieceIdx: 26, face: 'Front', position: 6 },
  { pieceIdx: 37, face: 'Front', position: 9 },
  { pieceIdx: 38, face: 'Front', position: 10 },
  // Back face centers
  { pieceIdx: 18, face: 'Back', position: 5 },
  { pieceIdx: 17, face: 'Back', position: 6 },
  { pieceIdx: 30, face: 'Back', position: 9 },
  { pieceIdx: 29, face: 'Back', position: 10 },
  // Right face centers
  { pieceIdx: 23, face: 'Right', position: 5 },
  { pieceIdx: 21, face: 'Right', position: 6 },
  { pieceIdx: 35, face: 'Right', position: 9 },
  { pieceIdx: 33, face: 'Right', position: 10 },
  // Left face centers
  { pieceIdx: 20, face: 'Left', position: 5 },
  { pieceIdx: 22, face: 'Left', position: 6 },
  { pieceIdx: 32, face: 'Left', position: 9 },
  { pieceIdx: 34, face: 'Left', position: 10 },
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
 * Calculates the parity of center permutation for a given color
 * Centers of the same color can be permuted, but the parity must be even
 */
function getCenterParityForColor(
  centers: Array<{ pieceIdx: number; color: TCubeFaceColor }>,
  color: TCubeFaceColor,
): boolean {
  const colorCenters = centers.filter((c) => c.color === color);
  if (colorCenters.length !== 4) return false; // Should have exactly 4 centers per color

  // Create a permutation array based on piece indices
  const indices = colorCenters.map((c) => c.pieceIdx).sort((a, b) => a - b);
  const permutation = colorCenters.map((c) => indices.indexOf(c.pieceIdx));

  return getPermutationParity(permutation);
}

/**
 * Checks if the 4x4x4 cube is solvable
 * Algorithm checks:
 * 1. Parity of the corner permutations
 * 2. Sum of the corner orientations (must be divisible by 3)
 * 3. Parity of the edge permutations (considering pairs)
 * 4. Sum of the edge orientations (must be divisible by 2)
 * 5. Parity of center permutations for each color (must be even)
 * 6. Corner, edge, and center permutation parities must be consistent
 *
 * @returns true if the cube is solvable, false otherwise
 */
export function is4x4x4CubeSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value['4x4x4 Cube'];
  if (!logicalValues) return false;

  // 1. Collect the colors of all corners
  const corners: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
  }> = [];

  for (const corner of CORNER_MAPPING_4X4) {
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

  for (const edge of EDGE_MAPPING_4X4) {
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

  // 3. Collect the colors of all centers
  const centers: Array<{
    pieceIdx: number;
    color: TCubeFaceColor;
  }> = [];

  for (const center of CENTER_MAPPING_4X4) {
    const faceValues = logicalValues[center.face];
    if (
      !faceValues ||
      faceValues[center.position] === null ||
      faceValues[center.position] === undefined
    ) {
      return false; // Missing data
    }
    centers.push({
      pieceIdx: center.pieceIdx,
      color: faceValues[center.position] as TCubeFaceColor,
    });
  }

  // 4. Determine the standard colors based on the most common colors on each face
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

  // 5. Build a map: which corner (by colors) should be on which position
  const cornerPositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < CORNER_MAPPING_4X4.length; pos++) {
    const corner = corners.find((c) => c.pieceIdx === CORNER_MAPPING_4X4[pos].pieceIdx);
    if (!corner) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...corner.colors].sort().join(',');

    // Find the standard position of this corner based on the colors
    let standardPos = -1;
    for (let i = 0; i < CORNER_MAPPING_4X4.length; i++) {
      const stdCorner = CORNER_MAPPING_4X4[i];
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

  // 6. Build a map: which edge (by colors) should be on which position
  const edgePositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < EDGE_MAPPING_4X4.length; pos++) {
    const edge = edges.find((e) => e.pieceIdx === EDGE_MAPPING_4X4[pos].pieceIdx);
    if (!edge) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...edge.colors].sort().join(',');

    // Find the standard position of this edge based on the colors
    let standardPos = -1;
    for (let i = 0; i < EDGE_MAPPING_4X4.length; i++) {
      const stdEdge = EDGE_MAPPING_4X4[i];
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

  // 7. Check the parity of the corner permutation
  const cornerPermutation = Array.from(
    { length: CORNER_MAPPING_4X4.length },
    (_, i) => cornerPositionToStandard.get(i) || 0,
  );
  const isCornerPermutationEven = getPermutationParity(cornerPermutation);

  // 8. Check the parity of the edge permutation
  const edgePermutation = Array.from(
    { length: EDGE_MAPPING_4X4.length },
    (_, i) => edgePositionToStandard.get(i) || 0,
  );
  const isEdgePermutationEven = getPermutationParity(edgePermutation);

  // 9. Calculate the sum of the corner orientations
  let totalCornerOrientation = 0;
  for (let pos = 0; pos < CORNER_MAPPING_4X4.length; pos++) {
    const corner = corners.find((c) => c.pieceIdx === CORNER_MAPPING_4X4[pos].pieceIdx);
    if (!corner) return false;

    const standardPos = cornerPositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_4X4[standardPos];
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

  // 10. Calculate the sum of the edge orientations
  let totalEdgeOrientation = 0;
  for (let pos = 0; pos < EDGE_MAPPING_4X4.length; pos++) {
    const edge = edges.find((e) => e.pieceIdx === EDGE_MAPPING_4X4[pos].pieceIdx);
    if (!edge) return false;

    const standardPos = edgePositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdEdge = EDGE_MAPPING_4X4[standardPos];
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

  // 11. Check center parities for each color
  const allFaceColors = Object.values(faceColors);
  const uniqueColors = Array.from(new Set(allFaceColors));

  for (const color of uniqueColors) {
    const centerParity = getCenterParityForColor(centers, color);
    if (!centerParity) {
      // Center parity must be even for each color
      return false;
    }
  }

  // 12. The cube is solvable if:
  // - Corner and edge permutation parities match
  // - Sum of the corner orientations is divisible by 3
  // - Sum of the edge orientations is divisible by 2
  // - All center parities are even (already checked above)
  return (
    isCornerPermutationEven === isEdgePermutationEven &&
    totalCornerOrientation % 3 === 0 &&
    totalEdgeOrientation % 2 === 0
  );
}

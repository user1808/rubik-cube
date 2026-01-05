import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  HexahedronFaces,
  type THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';

// Mapping of corners for 5x5x5 cube
// For each corner piece index determines on which faces and positions it is located
const CORNER_MAPPING_5X5: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
}> = [
  // Piece 0: Up-Left-Back
  {
    pieceIdx: 0,
    faces: [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 4 },
    ],
  },
  // Piece 4: Up-Right-Back
  {
    pieceIdx: 4,
    faces: [
      { face: 'Up', position: 4 },
      { face: 'Right', position: 4 },
      { face: 'Back', position: 0 },
    ],
  },
  // Piece 20: Up-Left-Front
  {
    pieceIdx: 20,
    faces: [
      { face: 'Up', position: 20 },
      { face: 'Left', position: 4 },
      { face: 'Front', position: 0 },
    ],
  },
  // Piece 24: Up-Right-Front
  {
    pieceIdx: 24,
    faces: [
      { face: 'Up', position: 24 },
      { face: 'Right', position: 0 },
      { face: 'Front', position: 4 },
    ],
  },
  // Piece 73: Down-Left-Back
  {
    pieceIdx: 73,
    faces: [
      { face: 'Down', position: 20 },
      { face: 'Left', position: 20 },
      { face: 'Back', position: 24 },
    ],
  },
  // Piece 77: Down-Right-Back
  {
    pieceIdx: 77,
    faces: [
      { face: 'Down', position: 24 },
      { face: 'Right', position: 24 },
      { face: 'Back', position: 20 },
    ],
  },
  // Piece 93: Down-Left-Front
  {
    pieceIdx: 93,
    faces: [
      { face: 'Down', position: 0 },
      { face: 'Left', position: 24 },
      { face: 'Front', position: 20 },
    ],
  },
  // Piece 97: Down-Right-Front
  {
    pieceIdx: 97,
    faces: [
      { face: 'Down', position: 4 },
      { face: 'Right', position: 20 },
      { face: 'Front', position: 24 },
    ],
  },
];

// Mapping of edges for 5x5x5 cube
// For each edge piece index determines on which faces and positions it is located
// Note: In 5x5x5, edges come in triplets (36 edges total, 12 triplets)
const EDGE_MAPPING_5X5: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
}> = [
  // Up-Back edges
  {
    pieceIdx: 1,
    faces: [
      { face: 'Up', position: 1 },
      { face: 'Back', position: 3 },
    ],
  },
  {
    pieceIdx: 2,
    faces: [
      { face: 'Up', position: 2 },
      { face: 'Back', position: 2 },
    ],
  },
  {
    pieceIdx: 3,
    faces: [
      { face: 'Up', position: 3 },
      { face: 'Back', position: 1 },
    ],
  },
  // Up-Left edges
  {
    pieceIdx: 5,
    faces: [
      { face: 'Up', position: 5 },
      { face: 'Left', position: 1 },
    ],
  },
  {
    pieceIdx: 10,
    faces: [
      { face: 'Up', position: 10 },
      { face: 'Left', position: 2 },
    ],
  },
  {
    pieceIdx: 15,
    faces: [
      { face: 'Up', position: 15 },
      { face: 'Left', position: 3 },
    ],
  },
  // Up-Right edges
  {
    pieceIdx: 9,
    faces: [
      { face: 'Up', position: 9 },
      { face: 'Right', position: 3 },
    ],
  },
  {
    pieceIdx: 14,
    faces: [
      { face: 'Up', position: 14 },
      { face: 'Right', position: 2 },
    ],
  },
  {
    pieceIdx: 19,
    faces: [
      { face: 'Up', position: 19 },
      { face: 'Right', position: 1 },
    ],
  },
  // Up-Front edges
  {
    pieceIdx: 21,
    faces: [
      { face: 'Up', position: 21 },
      { face: 'Front', position: 1 },
    ],
  },
  {
    pieceIdx: 22,
    faces: [
      { face: 'Up', position: 22 },
      { face: 'Front', position: 2 },
    ],
  },
  {
    pieceIdx: 23,
    faces: [
      { face: 'Up', position: 23 },
      { face: 'Front', position: 3 },
    ],
  },
  // Left-Back edges (middle layer)
  {
    pieceIdx: 25,
    faces: [
      { face: 'Left', position: 5 },
      { face: 'Back', position: 9 },
    ],
  },
  {
    pieceIdx: 41,
    faces: [
      { face: 'Left', position: 10 },
      { face: 'Back', position: 14 },
    ],
  },
  {
    pieceIdx: 57,
    faces: [
      { face: 'Left', position: 15 },
      { face: 'Back', position: 19 },
    ],
  },
  // Right-Back edges (middle layer)
  {
    pieceIdx: 29,
    faces: [
      { face: 'Right', position: 9 },
      { face: 'Back', position: 5 },
    ],
  },
  {
    pieceIdx: 45,
    faces: [
      { face: 'Right', position: 14 },
      { face: 'Back', position: 10 },
    ],
  },
  {
    pieceIdx: 61,
    faces: [
      { face: 'Right', position: 19 },
      { face: 'Back', position: 15 },
    ],
  },
  // Left-Front edges (middle layer)
  {
    pieceIdx: 36,
    faces: [
      { face: 'Left', position: 9 },
      { face: 'Front', position: 5 },
    ],
  },
  {
    pieceIdx: 52,
    faces: [
      { face: 'Left', position: 14 },
      { face: 'Front', position: 10 },
    ],
  },
  {
    pieceIdx: 68,
    faces: [
      { face: 'Left', position: 19 },
      { face: 'Front', position: 15 },
    ],
  },
  // Right-Front edges (middle layer)
  {
    pieceIdx: 40,
    faces: [
      { face: 'Right', position: 5 },
      { face: 'Front', position: 9 },
    ],
  },
  {
    pieceIdx: 56,
    faces: [
      { face: 'Right', position: 10 },
      { face: 'Front', position: 14 },
    ],
  },
  {
    pieceIdx: 72,
    faces: [
      { face: 'Right', position: 15 },
      { face: 'Front', position: 19 },
    ],
  },
  // Down-Back edges
  {
    pieceIdx: 74,
    faces: [
      { face: 'Down', position: 21 },
      { face: 'Back', position: 23 },
    ],
  },
  {
    pieceIdx: 75,
    faces: [
      { face: 'Down', position: 22 },
      { face: 'Back', position: 22 },
    ],
  },
  {
    pieceIdx: 76,
    faces: [
      { face: 'Down', position: 23 },
      { face: 'Back', position: 21 },
    ],
  },
  // Down-Left edges
  {
    pieceIdx: 78,
    faces: [
      { face: 'Down', position: 15 },
      { face: 'Left', position: 21 },
    ],
  },
  {
    pieceIdx: 83,
    faces: [
      { face: 'Down', position: 10 },
      { face: 'Left', position: 22 },
    ],
  },
  {
    pieceIdx: 88,
    faces: [
      { face: 'Down', position: 5 },
      { face: 'Left', position: 23 },
    ],
  },
  // Down-Right edges
  {
    pieceIdx: 82,
    faces: [
      { face: 'Down', position: 19 },
      { face: 'Right', position: 23 },
    ],
  },
  {
    pieceIdx: 87,
    faces: [
      { face: 'Down', position: 14 },
      { face: 'Right', position: 22 },
    ],
  },
  {
    pieceIdx: 92,
    faces: [
      { face: 'Down', position: 9 },
      { face: 'Right', position: 21 },
    ],
  },
  // Down-Front edges
  {
    pieceIdx: 94,
    faces: [
      { face: 'Down', position: 1 },
      { face: 'Front', position: 21 },
    ],
  },
  {
    pieceIdx: 95,
    faces: [
      { face: 'Down', position: 2 },
      { face: 'Front', position: 22 },
    ],
  },
  {
    pieceIdx: 96,
    faces: [
      { face: 'Down', position: 3 },
      { face: 'Front', position: 23 },
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
 * Finds the orientation of an edge (0 or 1)
 * Orientation is 0 if colors match standard order, 1 if flipped
 */
function getEdgeOrientation(
  edgeColors: [TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor],
): number | null {
  // Check if colors match in order (orientation 0)
  if (edgeColors[0] === standardColors[0] && edgeColors[1] === standardColors[1]) {
    return 0;
  }
  // Check if colors match flipped (orientation 1)
  if (edgeColors[0] === standardColors[1] && edgeColors[1] === standardColors[0]) {
    return 1;
  }
  return null; // No valid orientation found
}

/**
 * Checks if the 5x5x5 cube is solvable
 * Algorithm checks:
 * 1. Valid corner permutation (all 8 unique corners)
 * 2. Corner permutation parity equals middle-edge permutation parity
 * 3. Sum of the corner orientations (must be divisible by 3)
 * 4. Sum of the middle-edge orientations (must be divisible by 2)
 * 5. Valid edge color pairs (three of each adjacent face pair)
 * 6. Valid color distribution (each color appears 25 times)
 *
 * @returns true if the cube is solvable, false otherwise
 */
export function is5x5x5CubeSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value['5x5x5 Cube'];
  if (!logicalValues) return false;

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeProperties = getCurrentCubeProperties.value;
  if (!cubeProperties || cubeProperties.commonName !== '5x5x5 Cube') return false;
  const cubeFacesMaterials = cubeProperties.piecesMaterials?.cubeFacesMaterials;
  if (!cubeFacesMaterials) return false;

  // 1. Collect the colors of all corners
  const cornersByPosition = new Map<
    number,
    {
      pieceIdx: number;
      colors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];
    }
  >();

  for (const corner of CORNER_MAPPING_5X5) {
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
    cornersByPosition.set(corner.pieceIdx, cornerEntry);
  }

  // 2. Collect the colors of all edges
  const edges: Array<{
    pieceIdx: number;
    colors: [TCubeFaceColor, TCubeFaceColor];
  }> = [];
  const edgesByPosition = new Map<
    number,
    {
      pieceIdx: number;
      colors: [TCubeFaceColor, TCubeFaceColor];
    }
  >();

  for (const edge of EDGE_MAPPING_5X5) {
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
    edgesByPosition.set(edge.pieceIdx, edgeEntry);
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

  // Validate full color distribution: exactly 25 stickers for each face color
  const colorCounts = new Map<TCubeFaceColor, number>();
  const validColors = new Set(Object.values(faceColors));
  for (const face of HexahedronFaces) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues.length !== 25) return false;
    for (const color of faceValues) {
      if (color === null || color === undefined) return false;
      if (!validColors.has(color as TCubeFaceColor)) return false;
      colorCounts.set(color as TCubeFaceColor, (colorCounts.get(color as TCubeFaceColor) || 0) + 1);
    }
  }
  for (const color of validColors) {
    if (colorCounts.get(color) !== 25) return false;
  }

  // 5. Build a map: which corner (by colors) should be on which position
  const cornerPositionToStandard = new Map<number, number>();

  for (let pos = 0; pos < CORNER_MAPPING_5X5.length; pos++) {
    const corner = cornersByPosition.get(CORNER_MAPPING_5X5[pos].pieceIdx);
    if (!corner) return false;

    // Create a unique key for the combination of colors (sorted)
    const colorKey = [...corner.colors].sort().join(',');

    // Find the standard position of this corner based on the colors
    let standardPos = -1;
    for (let i = 0; i < CORNER_MAPPING_5X5.length; i++) {
      const stdCorner = CORNER_MAPPING_5X5[i];
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

  const cornerPermutation: number[] = [];
  const seenCorners = new Set<number>();
  for (let i = 0; i < CORNER_MAPPING_5X5.length; i++) {
    const value = cornerPositionToStandard.get(i);
    if (value === undefined) return false;
    if (seenCorners.has(value)) return false; // Duplicate corner piece -> invalid state
    seenCorners.add(value);
    cornerPermutation.push(value);
  }
  const isCornerPermutationEven = getPermutationParity(cornerPermutation);

  // 6. Validate that edges only use allowed adjacent face color pairs (3 per pair)
  const expectedEdgePairCounts = new Map<string, number>();
  const allowedEdgePairs = new Set<string>();
  for (const edge of EDGE_MAPPING_5X5) {
    const stdColors: TCubeFaceColor[] = [];
    for (const { face } of edge.faces) {
      if (faceColors[face] !== undefined) stdColors.push(faceColors[face]);
    }
    if (stdColors.length !== 2) return false;
    const key = [...stdColors].sort().join(',');
    allowedEdgePairs.add(key);
    expectedEdgePairCounts.set(key, (expectedEdgePairCounts.get(key) || 0) + 1);
  }
  const actualEdgePairCounts = new Map<string, number>();
  for (const edge of edges) {
    const pairKey = [...edge.colors].sort().join(',');
    if (!allowedEdgePairs.has(pairKey)) return false;
    actualEdgePairCounts.set(pairKey, (actualEdgePairCounts.get(pairKey) || 0) + 1);
  }
  for (const [key, expectedCount] of expectedEdgePairCounts) {
    if (actualEdgePairCounts.get(key) !== expectedCount) return false;
  }

  // 7. Calculate the sum of the corner orientations
  let totalCornerOrientation = 0;
  for (let pos = 0; pos < CORNER_MAPPING_5X5.length; pos++) {
    const corner = cornersByPosition.get(CORNER_MAPPING_5X5[pos].pieceIdx);
    if (!corner) return false;

    const standardPos = cornerPositionToStandard.get(pos);
    if (standardPos === undefined) return false;

    const stdCorner = CORNER_MAPPING_5X5[standardPos];
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

  // 8. Calculate parity and orientation constraints for middle edges only
  // EDGE_MAPPING_5X5 is grouped in triplets per edge; the middle entry is the center edge.
  const middleEdgePositions = EDGE_MAPPING_5X5.filter((_, index) => index % 3 === 1);
  const standardMiddleEdgeKeyToIndex = new Map<string, number>();
  for (let i = 0; i < middleEdgePositions.length; i++) {
    const middleEdge = middleEdgePositions[i];
    const stdColors: TCubeFaceColor[] = [];
    for (const { face } of middleEdge.faces) {
      if (faceColors[face] !== undefined) stdColors.push(faceColors[face]);
    }
    if (stdColors.length !== 2) return false;
    const key = [...stdColors].sort().join(',');
    standardMiddleEdgeKeyToIndex.set(key, i);
  }

  const middleEdgePermutation: number[] = [];
  let totalMiddleEdgeOrientation = 0;
  for (const middleEdge of middleEdgePositions) {
    const edge = edgesByPosition.get(middleEdge.pieceIdx);
    if (!edge) return false;

    const edgeKey = [...edge.colors].sort().join(',');
    const mappedIndex = standardMiddleEdgeKeyToIndex.get(edgeKey);
    if (mappedIndex === undefined) return false;
    middleEdgePermutation.push(mappedIndex);

    const standardColors: TCubeFaceColor[] = [];
    for (const { face } of middleEdge.faces) {
      if (faceColors[face] !== undefined) standardColors.push(faceColors[face]);
    }
    if (standardColors.length !== 2) return false;

    const orientation = getEdgeOrientation(edge.colors, [standardColors[0], standardColors[1]] as [
      TCubeFaceColor,
      TCubeFaceColor,
    ]);
    if (orientation === null) return false;
    totalMiddleEdgeOrientation += orientation;
  }
  const isMiddleEdgePermutationEven = getPermutationParity(middleEdgePermutation);

  // 9. The cube is solvable if:
  // - Corner permutation parity equals middle-edge permutation parity
  // - Sum of the corner orientations is divisible by 3
  // - Sum of the middle-edge orientations is divisible by 2
  return (
    isCornerPermutationEven === isMiddleEdgePermutationEven &&
    totalCornerOrientation % 3 === 0 &&
    totalMiddleEdgeOrientation % 2 === 0
  );
}

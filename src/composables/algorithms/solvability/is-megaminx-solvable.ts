import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  DodecahedronFaces,
  type TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { RubikDodecahedronFacesData } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/faces-data';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';

type TPieceFacePosition = { face: TDodecahedronFaces; position: number };

const dodecahedronFacesData = new RubikDodecahedronFacesData();
const facesPiecesIdxs = dodecahedronFacesData.facesPiecesIdxs;

const PIECE_FACE_POSITIONS = new Map<number, Array<TPieceFacePosition>>();
for (const face of DodecahedronFaces) {
  const facePieceIdxs = facesPiecesIdxs[face];
  for (let position = 0; position < facePieceIdxs.length; position++) {
    const pieceIdx = facePieceIdxs[position];
    const list = PIECE_FACE_POSITIONS.get(pieceIdx) ?? [];
    list.push({ face, position });
    PIECE_FACE_POSITIONS.set(pieceIdx, list);
  }
}

const FACE_ORDER_INDEX = new Map<TDodecahedronFaces, number>(
  DodecahedronFaces.map((face, index) => [face, index]),
);

const PIECE_ORDERED_POSITIONS = new Map<number, Array<TPieceFacePosition>>();
for (const [pieceIdx, positions] of PIECE_FACE_POSITIONS) {
  const ordered = [...positions].sort(
    (a, b) => (FACE_ORDER_INDEX.get(a.face) ?? 0) - (FACE_ORDER_INDEX.get(b.face) ?? 0),
  );
  PIECE_ORDERED_POSITIONS.set(pieceIdx, ordered);
}

const CORNER_PIECE_IDS = [...PIECE_FACE_POSITIONS.entries()]
  .filter(([, positions]) => positions.length === 3)
  .map(([pieceIdx]) => pieceIdx)
  .sort((a, b) => a - b);

const EDGE_PIECE_IDS = [...PIECE_FACE_POSITIONS.entries()]
  .filter(([, positions]) => positions.length === 2)
  .map(([pieceIdx]) => pieceIdx)
  .sort((a, b) => a - b);

const CENTER_PIECE_IDS = [...PIECE_FACE_POSITIONS.entries()]
  .filter(([, positions]) => positions.length === 1)
  .map(([pieceIdx]) => pieceIdx)
  .sort((a, b) => a - b);

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

function getCornerOrientation(
  cornerColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
  standardColors: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
): number | null {
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
  return null;
}

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

function getPieceColorsOrdered(
  logicalValues: Record<string, Array<Nullable<TCubeFaceColor>>>,
  pieceIdx: number,
): TCubeFaceColor[] | null {
  const positions = PIECE_ORDERED_POSITIONS.get(pieceIdx);
  if (!positions) return null;

  const colors: TCubeFaceColor[] = [];
  for (const { face, position } of positions) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues[position] === null || faceValues[position] === undefined) {
      return null;
    }
    colors.push(faceValues[position] as TCubeFaceColor);
  }
  return colors;
}

export function isMegaminxSolvable(): boolean {
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);
  const logicalValues = getFacesLogicalValues.value.Megaminx;
  if (!logicalValues) return false;

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeProperties = getCurrentCubeProperties.value;
  if (!cubeProperties || cubeProperties.commonName !== 'Megaminx') return false;
  const cubeFacesMaterials = cubeProperties.piecesMaterials?.cubeFacesMaterials;
  if (!cubeFacesMaterials) return false;

  if (
    CORNER_PIECE_IDS.length !== 20 ||
    EDGE_PIECE_IDS.length !== 30 ||
    CENTER_PIECE_IDS.length !== 12
  ) {
    return false;
  }

  const faceColors: Record<TDodecahedronFaces, TCubeFaceColor> = {} as Record<
    TDodecahedronFaces,
    TCubeFaceColor
  >;
  for (const face of DodecahedronFaces) {
    const material = cubeFacesMaterials[face];
    if (!material) return false;
    faceColors[face] = material.color;
  }
  if (new Set(Object.values(faceColors)).size !== DodecahedronFaces.length) return false;

  const colorCounts = new Map<TCubeFaceColor, number>();
  const validColors = new Set(Object.values(faceColors));
  for (const face of DodecahedronFaces) {
    const faceValues = logicalValues[face];
    if (!faceValues || faceValues.length !== 11) return false;
    for (const color of faceValues) {
      if (color === null || color === undefined) return false;
      if (!validColors.has(color as TCubeFaceColor)) return false;
      colorCounts.set(color as TCubeFaceColor, (colorCounts.get(color as TCubeFaceColor) || 0) + 1);
    }
  }
  for (const color of validColors) {
    if (colorCounts.get(color) !== 11) return false;
  }

  for (const centerPieceId of CENTER_PIECE_IDS) {
    const positions = PIECE_ORDERED_POSITIONS.get(centerPieceId);
    if (!positions || positions.length !== 1) return false;
    const { face, position } = positions[0];
    const faceValues = logicalValues[face];
    if (!faceValues) return false;
    const color = faceValues[position];
    if (color === null || color === undefined) return false;
    if (color !== faceColors[face]) return false;
  }

  const cornerStandardColorsByIndex: Array<[TCubeFaceColor, TCubeFaceColor, TCubeFaceColor]> = [];
  const cornerKeyToIndex = new Map<string, number>();
  for (let i = 0; i < CORNER_PIECE_IDS.length; i++) {
    const pieceId = CORNER_PIECE_IDS[i];
    const orderedPositions = PIECE_ORDERED_POSITIONS.get(pieceId);
    if (!orderedPositions) return false;
    const standardColors = orderedPositions.map(({ face }) => faceColors[face]) as [
      TCubeFaceColor,
      TCubeFaceColor,
      TCubeFaceColor,
    ];
    if (new Set(standardColors).size !== 3) return false;
    const key = [...standardColors].sort().join(',');
    cornerKeyToIndex.set(key, i);
    cornerStandardColorsByIndex.push(standardColors);
  }

  const edgeStandardColorsByIndex: Array<[TCubeFaceColor, TCubeFaceColor]> = [];
  const edgeKeyToIndex = new Map<string, number>();
  for (let i = 0; i < EDGE_PIECE_IDS.length; i++) {
    const pieceId = EDGE_PIECE_IDS[i];
    const orderedPositions = PIECE_ORDERED_POSITIONS.get(pieceId);
    if (!orderedPositions) return false;
    const standardColors = orderedPositions.map(({ face }) => faceColors[face]) as [
      TCubeFaceColor,
      TCubeFaceColor,
    ];
    if (new Set(standardColors).size !== 2) return false;
    const key = [...standardColors].sort().join(',');
    edgeKeyToIndex.set(key, i);
    edgeStandardColorsByIndex.push(standardColors);
  }

  const cornerPermutation: number[] = [];
  const seenCorners = new Set<number>();
  let totalCornerOrientation = 0;
  for (const slotPieceId of CORNER_PIECE_IDS) {
    const currentColors = getPieceColorsOrdered(logicalValues, slotPieceId);
    if (!currentColors || currentColors.length !== 3) return false;
    if (new Set(currentColors).size !== 3) return false;
    const key = [...currentColors].sort().join(',');
    const standardIndex = cornerKeyToIndex.get(key);
    if (standardIndex === undefined) return false;
    if (seenCorners.has(standardIndex)) return false;
    seenCorners.add(standardIndex);
    cornerPermutation.push(standardIndex);

    const orientation = getCornerOrientation(
      currentColors as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
      cornerStandardColorsByIndex[standardIndex],
    );
    if (orientation === null) return false;
    totalCornerOrientation += orientation;
  }

  const edgePermutation: number[] = [];
  const seenEdges = new Set<number>();
  let totalEdgeOrientation = 0;
  for (const slotPieceId of EDGE_PIECE_IDS) {
    const currentColors = getPieceColorsOrdered(logicalValues, slotPieceId);
    if (!currentColors || currentColors.length !== 2) return false;
    if (new Set(currentColors).size !== 2) return false;
    const key = [...currentColors].sort().join(',');
    const standardIndex = edgeKeyToIndex.get(key);
    if (standardIndex === undefined) return false;
    if (seenEdges.has(standardIndex)) return false;
    seenEdges.add(standardIndex);
    edgePermutation.push(standardIndex);

    const orientation = getEdgeOrientation(
      currentColors as [TCubeFaceColor, TCubeFaceColor],
      edgeStandardColorsByIndex[standardIndex],
    );
    if (orientation === null) return false;
    totalEdgeOrientation += orientation;
  }

  const isCornerPermutationEven = getPermutationParity(cornerPermutation);
  const isEdgePermutationEven = getPermutationParity(edgePermutation);

  return (
    isCornerPermutationEven &&
    isEdgePermutationEven &&
    totalCornerOrientation % 3 === 0 &&
    totalEdgeOrientation % 2 === 0
  );
}

import type { TCubeMovesHistoryLog } from '@/rubik-cube-app/rubik-cube/types/cube-moves-history-log';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

type TRotationType = 'Clockwise' | 'CounterClockwise';
type TFaceLogicalValuesInput = Record<string, Array<TCubeFaceColor | null | undefined>>;
type TFaceLogicalValues = Record<THexahedronFaces, Array<TCubeFaceColor>>;
type TCubieState = { perm: number[]; ori: number[] };
type TFaceColorAssignment = Record<THexahedronFaces, TCubeFaceColor>;
type TVector3Int = { x: -1 | 0 | 1; y: -1 | 0 | 1; z: -1 | 0 | 1 };
type TMove = {
  rotationGroup: THexahedronFaces;
  rotationType: TRotationType;
  notation: string;
  faceIndex: number;
  direction: 1 | -1;
};

const FACE_ORDER: ReadonlyArray<THexahedronFaces> = [
  'Front',
  'Back',
  'Right',
  'Left',
  'Up',
  'Down',
];

const FACE_NOTATION: Record<THexahedronFaces, string> = {
  Front: 'F',
  Back: 'B',
  Right: 'R',
  Left: 'L',
  Up: 'U',
  Down: 'D',
};

/**
 * Corner definition compatible with current project indexing:
 * - `pieceIdx`: logical corner index (0..7)
 * - `faces`: ordered triple used by logicalValues at a given corner position
 * - `coord`: fixed cube coordinate for this corner position
 */
const CORNER_MAPPING_2X2: Array<{
  pieceIdx: number;
  faces: Array<{ face: THexahedronFaces; position: number }>;
  coord: TVector3Int;
}> = [
  {
    pieceIdx: 0, // ULB
    faces: [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 1 },
    ],
    coord: { x: -1, y: 1, z: -1 },
  },
  {
    pieceIdx: 1, // URB
    faces: [
      { face: 'Up', position: 1 },
      { face: 'Right', position: 1 },
      { face: 'Back', position: 0 },
    ],
    coord: { x: 1, y: 1, z: -1 },
  },
  {
    pieceIdx: 2, // ULF
    faces: [
      { face: 'Up', position: 2 },
      { face: 'Left', position: 1 },
      { face: 'Front', position: 0 },
    ],
    coord: { x: -1, y: 1, z: 1 },
  },
  {
    pieceIdx: 3, // URF
    faces: [
      { face: 'Up', position: 3 },
      { face: 'Right', position: 0 },
      { face: 'Front', position: 1 },
    ],
    coord: { x: 1, y: 1, z: 1 },
  },
  {
    pieceIdx: 4, // DLB
    faces: [
      { face: 'Down', position: 2 },
      { face: 'Left', position: 2 },
      { face: 'Back', position: 3 },
    ],
    coord: { x: -1, y: -1, z: -1 },
  },
  {
    pieceIdx: 5, // DRB
    faces: [
      { face: 'Down', position: 3 },
      { face: 'Right', position: 3 },
      { face: 'Back', position: 2 },
    ],
    coord: { x: 1, y: -1, z: -1 },
  },
  {
    pieceIdx: 6, // DLF
    faces: [
      { face: 'Down', position: 0 },
      { face: 'Left', position: 3 },
      { face: 'Front', position: 2 },
    ],
    coord: { x: -1, y: -1, z: 1 },
  },
  {
    pieceIdx: 7, // DRF
    faces: [
      { face: 'Down', position: 1 },
      { face: 'Right', position: 2 },
      { face: 'Front', position: 3 },
    ],
    coord: { x: 1, y: -1, z: 1 },
  },
];

const MOVE_CYCLES: Record<THexahedronFaces, [number, number, number, number]> = {
  Front: [2, 3, 6, 7],
  Back: [1, 0, 5, 4],
  Right: [3, 1, 7, 5],
  Left: [0, 2, 4, 6],
  Up: [0, 1, 2, 3],
  Down: [6, 7, 4, 5],
};

const CYCLE_PATTERNS: Record<TRotationType, [number, number, number, number]> = {
  Clockwise: [2, 0, 3, 1],
  CounterClockwise: [1, 3, 0, 2],
};

const OPPOSITE_ROTATION: Record<TRotationType, TRotationType> = {
  Clockwise: 'CounterClockwise',
  CounterClockwise: 'Clockwise',
};

const FACE_NORMALS: Record<THexahedronFaces, TVector3Int> = {
  Front: { x: 0, y: 0, z: 1 },
  Back: { x: 0, y: 0, z: -1 },
  Right: { x: 1, y: 0, z: 0 },
  Left: { x: -1, y: 0, z: 0 },
  Up: { x: 0, y: 1, z: 0 },
  Down: { x: 0, y: -1, z: 0 },
};

const MOVES: Array<TMove> = FACE_ORDER.flatMap((face, faceIndex) => {
  const clockwise: TMove = {
    rotationGroup: face,
    rotationType: 'Clockwise',
    notation: FACE_NOTATION[face],
    faceIndex,
    direction: 1,
  };
  const counterClockwise: TMove = {
    rotationGroup: face,
    rotationType: 'CounterClockwise',
    notation: `${FACE_NOTATION[face]}'`,
    faceIndex,
    direction: -1,
  };
  return [clockwise, counterClockwise];
});

const FACTORIALS: number[] = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];
const PERMUTATION_STATE_COUNT = FACTORIALS[8]; // 8!
const ORIENTATION_STATE_COUNT = 3 ** 7; // 3^7 (8th corner orientation derived by modulo)
const MAX_IDA_STAR_DEPTH = 20; // 2x2x2 max in quarter-turn metric is 14, this is a safe cap.

const CANONICAL_FACE_COLORS: TFaceColorAssignment = {
  Front: 0 as TCubeFaceColor,
  Back: 1 as TCubeFaceColor,
  Right: 2 as TCubeFaceColor,
  Left: 3 as TCubeFaceColor,
  Up: 4 as TCubeFaceColor,
  Down: 5 as TCubeFaceColor,
};

type TPrecomputedData = {
  nextPerm: Uint16Array[];
  nextOri: Uint16Array[];
  permDistance: Int8Array;
  oriDistance: Int8Array;
};

let precomputedDataCache: TPrecomputedData | null = null;

/**
 * Solve 2x2x2 cube based on current logical face values.
 *
 * Input is intentionally plain logical values (without store access), so this function can be used
 * as a pure algorithm utility.
 *
 * Returned moves are in `TCubeMovesHistoryLog` format used by the app history store.
 */
export function solve2x2x2Cube(
  logicalValuesInput: TFaceLogicalValuesInput,
): Array<TCubeMovesHistoryLog> {
  const logicalValues = normalizeLogicalValues(logicalValuesInput);
  if (!logicalValues) return [];

  const candidateAssignments = buildCandidateFaceColorAssignments(logicalValues);
  if (candidateAssignments.length === 0) return [];

  const precomputed = getPrecomputedData();

  let bestSolutionMoves: number[] | null = null;

  for (const assignment of candidateAssignments) {
    const state = parseCubieState(logicalValues, assignment);
    if (!state) continue;

    const permutationCoord = encodePermutation(state.perm);
    const orientationCoord = encodeOrientation(state.ori);

    const moves = solveWithIdaStar(permutationCoord, orientationCoord, precomputed);
    if (!moves) continue;

    if (!bestSolutionMoves || moves.length < bestSolutionMoves.length) {
      bestSolutionMoves = moves;
      if (bestSolutionMoves.length === 0) break;
    }
  }

  if (!bestSolutionMoves) return [];
  return bestSolutionMoves.map((moveIdx) => toMoveHistoryLog(MOVES[moveIdx]));
}

function getPrecomputedData(): TPrecomputedData {
  if (precomputedDataCache) return precomputedDataCache;

  const nextPerm = buildPermutationTransitionTable();
  const nextOri = buildOrientationTransitionTable();
  const permDistance = buildDistanceTable(PERMUTATION_STATE_COUNT, nextPerm, 0);
  const oriDistance = buildDistanceTable(ORIENTATION_STATE_COUNT, nextOri, 0);

  precomputedDataCache = {
    nextPerm,
    nextOri,
    permDistance,
    oriDistance,
  };
  return precomputedDataCache;
}

function toMoveHistoryLog(move: TMove): TCubeMovesHistoryLog {
  return {
    notation: move.notation,
    rotationGroup: move.rotationGroup,
    rotationType: move.rotationType,
    contraryRotationType: OPPOSITE_ROTATION[move.rotationType],
  };
}

/**
 * Strict normalization:
 * - all six hexahedron faces exist
 * - every face has exactly 4 non-null stickers
 * - exactly 6 unique colors and each appears exactly 4 times
 */
function normalizeLogicalValues(input: TFaceLogicalValuesInput): TFaceLogicalValues | null {
  const normalized = {} as TFaceLogicalValues;

  for (const face of FACE_ORDER) {
    const faceValues = input[face];
    if (!Array.isArray(faceValues) || faceValues.length !== 4) return null;

    const values: TCubeFaceColor[] = [];
    for (const value of faceValues) {
      if (value === null || value === undefined) return null;
      values.push(value);
    }
    normalized[face] = values;
  }

  const allColors = FACE_ORDER.flatMap((face) => normalized[face]);
  const colorCounts = new Map<TCubeFaceColor, number>();
  for (const color of allColors) {
    colorCounts.set(color, (colorCounts.get(color) ?? 0) + 1);
  }

  if (colorCounts.size !== 6) return null;
  if ([...colorCounts.values()].some((count) => count !== 4)) return null;

  return normalized;
}

/**
 * Derive possible color->face mappings from current sticker set.
 *
 * This is needed because for 2x2x2 there are no fixed centers, so logical values alone do not
 * directly define which color "belongs" to which face in the solved state.
 *
 * We test all 6! mappings and keep only those that produce exactly the expected 8 corner color
 * triplets in solved geometry.
 */
function buildCandidateFaceColorAssignments(
  logicalValues: TFaceLogicalValues,
): Array<TFaceColorAssignment> {
  const uniqueColors = [...new Set(FACE_ORDER.flatMap((face) => logicalValues[face]))];
  if (uniqueColors.length !== 6) return [];

  const observedCornerMultiset = buildObservedCornerMultiset(logicalValues);
  const permutations = permuteColors(uniqueColors);
  const validAssignments: Array<TFaceColorAssignment> = [];

  for (const colorsPermutation of permutations) {
    const assignment = {} as TFaceColorAssignment;
    FACE_ORDER.forEach((face, idx) => {
      assignment[face] = colorsPermutation[idx];
    });

    const expectedMultiset = buildExpectedCornerMultiset(assignment);
    if (areMultisetsEqual(observedCornerMultiset, expectedMultiset)) {
      validAssignments.push(assignment);
    }
  }

  return validAssignments;
}

function buildObservedCornerMultiset(logicalValues: TFaceLogicalValues): Map<string, number> {
  const multiset = new Map<string, number>();
  for (const corner of CORNER_MAPPING_2X2) {
    const colors = corner.faces.map(({ face, position }) => logicalValues[face][position]);
    const key = cornerKey(colors);
    multiset.set(key, (multiset.get(key) ?? 0) + 1);
  }
  return multiset;
}

function buildExpectedCornerMultiset(assignment: TFaceColorAssignment): Map<string, number> {
  const multiset = new Map<string, number>();
  for (const corner of CORNER_MAPPING_2X2) {
    const colors = corner.faces.map(({ face }) => assignment[face]);
    const key = cornerKey(colors);
    multiset.set(key, (multiset.get(key) ?? 0) + 1);
  }
  return multiset;
}

function areMultisetsEqual(a: Map<string, number>, b: Map<string, number>): boolean {
  if (a.size !== b.size) return false;
  for (const [key, value] of a) {
    if (b.get(key) !== value) return false;
  }
  return true;
}

function cornerKey(colors: Array<TCubeFaceColor>): string {
  return [...colors].sort((x, y) => x - y).join(',');
}

function permuteColors(colors: Array<TCubeFaceColor>): Array<Array<TCubeFaceColor>> {
  const result: Array<Array<TCubeFaceColor>> = [];
  const used = new Array<boolean>(colors.length).fill(false);
  const current: TCubeFaceColor[] = [];

  const dfs = () => {
    if (current.length === colors.length) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < colors.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      current.push(colors[i]);
      dfs();
      current.pop();
      used[i] = false;
    }
  };

  dfs();
  return result;
}

/**
 * Parse sticker-level logical values into cubie coordinates:
 * - permutation of 8 corners
 * - orientation for each corner in {0,1,2}
 */
function parseCubieState(
  logicalValues: TFaceLogicalValues,
  assignment: TFaceColorAssignment,
): TCubieState | null {
  const standardCornerByKey = new Map<string, number>();
  for (const corner of CORNER_MAPPING_2X2) {
    const standardColors = corner.faces.map(({ face }) => assignment[face]);
    standardCornerByKey.set(cornerKey(standardColors), corner.pieceIdx);
  }

  const perm = new Array<number>(8).fill(-1);
  const ori = new Array<number>(8).fill(-1);
  const seenPieces = new Set<number>();

  for (const cornerPosition of CORNER_MAPPING_2X2) {
    const observedColors = cornerPosition.faces.map(
      ({ face, position }) => logicalValues[face][position],
    ) as [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor];

    const pieceIdx = standardCornerByKey.get(cornerKey(observedColors));
    if (pieceIdx === undefined || seenPieces.has(pieceIdx)) return null;

    const pieceHome = CORNER_MAPPING_2X2[pieceIdx];
    const standardColors = pieceHome.faces.map(({ face }) => assignment[face]) as [
      TCubeFaceColor,
      TCubeFaceColor,
      TCubeFaceColor,
    ];

    const orientation = getCornerOrientation(observedColors, standardColors);
    if (orientation === null) return null;

    perm[cornerPosition.pieceIdx] = pieceIdx;
    ori[cornerPosition.pieceIdx] = orientation;
    seenPieces.add(pieceIdx);
  }

  if (seenPieces.size !== 8) return null;
  if (ori.reduce((sum, value) => sum + value, 0) % 3 !== 0) return null;

  return { perm, ori };
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

function buildPermutationTransitionTable(): Uint16Array[] {
  const transitions: Uint16Array[] = Array.from(
    { length: PERMUTATION_STATE_COUNT },
    () => new Uint16Array(MOVES.length),
  );

  for (let permCoord = 0; permCoord < PERMUTATION_STATE_COUNT; permCoord++) {
    const perm = decodePermutation(permCoord);
    for (let moveIdx = 0; moveIdx < MOVES.length; moveIdx++) {
      const movedPerm = applyMoveToPermutation(perm, MOVES[moveIdx]);
      transitions[permCoord][moveIdx] = encodePermutation(movedPerm);
    }
  }

  return transitions;
}

/**
 * Orientation transitions are generated through a geometry-consistent sticker simulation.
 * This avoids hard-coding orientation deltas and guarantees compatibility with project face layout.
 */
function buildOrientationTransitionTable(): Uint16Array[] {
  const transitions: Uint16Array[] = Array.from(
    { length: ORIENTATION_STATE_COUNT },
    () => new Uint16Array(MOVES.length),
  );

  const solvedPermutation = [0, 1, 2, 3, 4, 5, 6, 7];

  for (let oriCoord = 0; oriCoord < ORIENTATION_STATE_COUNT; oriCoord++) {
    const ori = decodeOrientation(oriCoord);
    const state: TCubieState = { perm: solvedPermutation, ori };

    for (let moveIdx = 0; moveIdx < MOVES.length; moveIdx++) {
      const movedState = applyMoveToCubieStateByGeometry(state, MOVES[moveIdx]);
      transitions[oriCoord][moveIdx] = encodeOrientation(movedState.ori);
    }
  }

  return transitions;
}

function buildDistanceTable(
  stateCount: number,
  transitions: Uint16Array[],
  solvedCoord: number,
): Int8Array {
  const distance = new Int8Array(stateCount);
  distance.fill(-1);
  distance[solvedCoord] = 0;

  const queue = new Uint32Array(stateCount);
  let head = 0;
  let tail = 0;
  queue[tail++] = solvedCoord;

  while (head < tail) {
    const current = queue[head++];
    const nextDepth = distance[current] + 1;
    const currentTransitions = transitions[current];

    for (let moveIdx = 0; moveIdx < currentTransitions.length; moveIdx++) {
      const next = currentTransitions[moveIdx];
      if (distance[next] !== -1) continue;
      distance[next] = nextDepth;
      queue[tail++] = next;
    }
  }

  return distance;
}

function solveWithIdaStar(
  startPerm: number,
  startOri: number,
  precomputed: TPrecomputedData,
): number[] | null {
  if (startPerm === 0 && startOri === 0) return [];

  const path: number[] = [];
  let bound = heuristic(startPerm, startOri, precomputed);

  for (; bound <= MAX_IDA_STAR_DEPTH; bound++) {
    const result = idaSearch(startPerm, startOri, 0, bound, -1, path, precomputed);
    if (result === 'FOUND') {
      return [...path];
    }
    if (typeof result === 'number' && result > MAX_IDA_STAR_DEPTH) {
      break;
    }
  }

  return null;
}

function idaSearch(
  perm: number,
  ori: number,
  depth: number,
  bound: number,
  lastMove: number,
  path: number[],
  precomputed: TPrecomputedData,
): number | 'FOUND' {
  const h = heuristic(perm, ori, precomputed);
  const f = depth + h;
  if (f > bound) return f;
  if (perm === 0 && ori === 0) return 'FOUND';

  let minExceededBound = Number.POSITIVE_INFINITY;

  for (let moveIdx = 0; moveIdx < MOVES.length; moveIdx++) {
    if (isImmediateInverse(lastMove, moveIdx)) continue;

    const nextPerm = precomputed.nextPerm[perm][moveIdx];
    const nextOri = precomputed.nextOri[ori][moveIdx];

    path[depth] = moveIdx;
    const result = idaSearch(nextPerm, nextOri, depth + 1, bound, moveIdx, path, precomputed);
    if (result === 'FOUND') {
      path.length = depth + 1;
      return 'FOUND';
    }
    if (typeof result === 'number' && result < minExceededBound) {
      minExceededBound = result;
    }
  }

  return minExceededBound;
}

function heuristic(perm: number, ori: number, precomputed: TPrecomputedData): number {
  return Math.max(precomputed.permDistance[perm], precomputed.oriDistance[ori]);
}

function isImmediateInverse(lastMoveIdx: number, nextMoveIdx: number): boolean {
  if (lastMoveIdx < 0) return false;
  const lastMove = MOVES[lastMoveIdx];
  const nextMove = MOVES[nextMoveIdx];
  return lastMove.faceIndex === nextMove.faceIndex && lastMove.direction + nextMove.direction === 0;
}

function applyMoveToPermutation(perm: number[], move: TMove): number[] {
  const next = [...perm];
  const positions = MOVE_CYCLES[move.rotationGroup];
  const pattern = CYCLE_PATTERNS[move.rotationType];
  for (let i = 0; i < 4; i++) {
    next[positions[i]] = perm[positions[pattern[i]]];
  }
  return next;
}

function applyMoveToCubieStateByGeometry(state: TCubieState, move: TMove): TCubieState {
  const logicalValues = cubieStateToLogicalValues(state, CANONICAL_FACE_COLORS);
  const movedLogicalValues = applyMoveToLogicalValues(logicalValues, move);
  const parsed = parseCubieState(movedLogicalValues, CANONICAL_FACE_COLORS);
  if (!parsed) {
    // This should never happen; return identity-like fallback for safety.
    return state;
  }
  return parsed;
}

function cubieStateToLogicalValues(
  state: TCubieState,
  assignment: TFaceColorAssignment,
): TFaceLogicalValues {
  const result = createEmptyLogicalValues(-1 as TCubeFaceColor);

  for (const cornerPosition of CORNER_MAPPING_2X2) {
    const positionIdx = cornerPosition.pieceIdx;
    const pieceIdx = state.perm[positionIdx];
    const orientation = state.ori[positionIdx];
    const pieceHome = CORNER_MAPPING_2X2[pieceIdx];

    const homeColors = pieceHome.faces.map(({ face }) => assignment[face]) as [
      TCubeFaceColor,
      TCubeFaceColor,
      TCubeFaceColor,
    ];
    const orientedColors = rotateRight3(homeColors, orientation);

    cornerPosition.faces.forEach(({ face, position }, i) => {
      result[face][position] = orientedColors[i];
    });
  }

  return result;
}

function rotateRight3(
  [a, b, c]: [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor],
  times: number,
): [TCubeFaceColor, TCubeFaceColor, TCubeFaceColor] {
  const t = ((times % 3) + 3) % 3;
  if (t === 0) return [a, b, c];
  if (t === 1) return [c, a, b];
  return [b, c, a];
}

function createEmptyLogicalValues(fill: TCubeFaceColor): TFaceLogicalValues {
  return {
    Front: [fill, fill, fill, fill],
    Back: [fill, fill, fill, fill],
    Right: [fill, fill, fill, fill],
    Left: [fill, fill, fill, fill],
    Up: [fill, fill, fill, fill],
    Down: [fill, fill, fill, fill],
  };
}

const STICKER_GEOMETRY = CORNER_MAPPING_2X2.flatMap((corner) =>
  corner.faces.map(({ face, position }) => ({
    face,
    position,
    coord: corner.coord,
    normal: FACE_NORMALS[face],
  })),
);

function applyMoveToLogicalValues(values: TFaceLogicalValues, move: TMove): TFaceLogicalValues {
  const next = createEmptyLogicalValues(-1 as TCubeFaceColor);
  const axis = FACE_NORMALS[move.rotationGroup];
  const quarterTurn: 1 | -1 = move.rotationType === 'Clockwise' ? -1 : 1;

  for (const sticker of STICKER_GEOMETRY) {
    const color = values[sticker.face][sticker.position];
    const shouldRotate = isStickerInRotatedLayer(sticker.coord, axis);

    const nextCoord = shouldRotate ? rotateVector(sticker.coord, axis, quarterTurn) : sticker.coord;
    const nextNormal = shouldRotate
      ? rotateVector(sticker.normal, axis, quarterTurn)
      : sticker.normal;

    const nextFace = faceFromNormal(nextNormal);
    const nextPosition = facePositionFromCoord(nextFace, nextCoord);
    next[nextFace][nextPosition] = color;
  }

  return next;
}

function isStickerInRotatedLayer(coord: TVector3Int, axis: TVector3Int): boolean {
  if (axis.x !== 0) return coord.x === axis.x;
  if (axis.y !== 0) return coord.y === axis.y;
  return coord.z === axis.z;
}

function rotateVector(vec: TVector3Int, axis: TVector3Int, quarterTurn: 1 | -1): TVector3Int {
  const axisSign = (axis.x || axis.y || axis.z) as 1 | -1;
  const effectiveTurn = (quarterTurn * axisSign) as 1 | -1;

  if (axis.x !== 0) {
    return effectiveTurn === 1
      ? { x: vec.x, y: -vec.z as -1 | 0 | 1, z: vec.y as -1 | 0 | 1 }
      : { x: vec.x, y: vec.z as -1 | 0 | 1, z: -vec.y as -1 | 0 | 1 };
  }
  if (axis.y !== 0) {
    return effectiveTurn === 1
      ? { x: vec.z as -1 | 0 | 1, y: vec.y, z: -vec.x as -1 | 0 | 1 }
      : { x: -vec.z as -1 | 0 | 1, y: vec.y, z: vec.x as -1 | 0 | 1 };
  }
  return effectiveTurn === 1
    ? { x: -vec.y as -1 | 0 | 1, y: vec.x as -1 | 0 | 1, z: vec.z }
    : { x: vec.y as -1 | 0 | 1, y: -vec.x as -1 | 0 | 1, z: vec.z };
}

function faceFromNormal(normal: TVector3Int): THexahedronFaces {
  if (normal.x === 1) return 'Right';
  if (normal.x === -1) return 'Left';
  if (normal.y === 1) return 'Up';
  if (normal.y === -1) return 'Down';
  if (normal.z === 1) return 'Front';
  return 'Back';
}

/**
 * Convert corner coordinate to local 2x2 sticker index on a face.
 * Indexing is aligned with project face arrays used in `logicalValues`.
 */
function facePositionFromCoord(face: THexahedronFaces, coord: TVector3Int): number {
  if (face === 'Up') {
    if (coord.x === -1 && coord.z === -1) return 0;
    if (coord.x === 1 && coord.z === -1) return 1;
    if (coord.x === -1 && coord.z === 1) return 2;
    return 3;
  }

  if (face === 'Down') {
    if (coord.x === -1 && coord.z === 1) return 0;
    if (coord.x === 1 && coord.z === 1) return 1;
    if (coord.x === -1 && coord.z === -1) return 2;
    return 3;
  }

  if (face === 'Front') {
    if (coord.x === -1 && coord.y === 1) return 0;
    if (coord.x === 1 && coord.y === 1) return 1;
    if (coord.x === -1 && coord.y === -1) return 2;
    return 3;
  }

  if (face === 'Back') {
    if (coord.x === 1 && coord.y === 1) return 0;
    if (coord.x === -1 && coord.y === 1) return 1;
    if (coord.x === 1 && coord.y === -1) return 2;
    return 3;
  }

  if (face === 'Right') {
    if (coord.y === 1 && coord.z === 1) return 0;
    if (coord.y === 1 && coord.z === -1) return 1;
    if (coord.y === -1 && coord.z === 1) return 2;
    return 3;
  }

  // Left
  if (coord.y === 1 && coord.z === -1) return 0;
  if (coord.y === 1 && coord.z === 1) return 1;
  if (coord.y === -1 && coord.z === -1) return 2;
  return 3;
}

function encodePermutation(perm: number[]): number {
  let index = 0;
  for (let i = 0; i < 8; i++) {
    let smallerOnRight = 0;
    for (let j = i + 1; j < 8; j++) {
      if (perm[j] < perm[i]) smallerOnRight++;
    }
    index += smallerOnRight * FACTORIALS[7 - i];
  }
  return index;
}

function decodePermutation(index: number): number[] {
  const values = [0, 1, 2, 3, 4, 5, 6, 7];
  const perm: number[] = [];
  let remainder = index;

  for (let i = 7; i >= 0; i--) {
    const f = FACTORIALS[i];
    const selected = Math.floor(remainder / f);
    remainder %= f;
    perm.push(values[selected]);
    values.splice(selected, 1);
  }

  return perm;
}

function encodeOrientation(ori: number[]): number {
  let index = 0;
  for (let i = 0; i < 7; i++) {
    index = index * 3 + ori[i];
  }
  return index;
}

function decodeOrientation(index: number): number[] {
  const ori = new Array<number>(8).fill(0);
  let remainder = index;
  let sum = 0;

  for (let i = 6; i >= 0; i--) {
    ori[i] = remainder % 3;
    sum += ori[i];
    remainder = Math.floor(remainder / 3);
  }

  ori[7] = (3 - (sum % 3)) % 3;
  return ori;
}

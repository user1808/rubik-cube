import type { TCubeMovesHistoryLog } from '@/rubik-cube-app/rubik-cube/types/cube-moves-history-log';
import { type THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';
import { is2x2x2CubeSolvable } from '../solvability/is-2x2x2-cube-solvable';

export const solve2x2x2Cube = (
  logicalValuesInput: TFaceLogicalValues<THexahedronFaces>,
): Array<TCubeMovesHistoryLog> => {
  const isSolvable = is2x2x2CubeSolvable();
  if (!isSolvable) return [];

  return [];
};

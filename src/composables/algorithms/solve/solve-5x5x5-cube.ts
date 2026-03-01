import type { TCubeMovesHistoryLog } from '@/rubik-cube-app/rubik-cube/types/cube-moves-history-log';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

type TFaceLogicalValuesInput = Record<string, Array<TCubeFaceColor | null | undefined>>;

export function solve5x5x5Cube(
  _logicalValuesInput: TFaceLogicalValuesInput,
): Array<TCubeMovesHistoryLog> {
  return [];
}

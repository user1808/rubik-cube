import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { TPieceDataIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron2x2PiecesData extends AbstractRubikHexahedronPiecesData<THexahedron2x2RotationGroups> {
  public override readonly rotationGroupsPiecesIdxs: Record<
    THexahedron2x2RotationGroups,
    Array<TPieceDataIdx>
  > = {
    Front: [2, 3, 6, 7],
    Back: [1, 0, 5, 4],
    Right: [3, 1, 7, 5],
    Left: [0, 2, 4, 6],
    Up: [0, 1, 2, 3],
    Down: [6, 7, 4, 5],
  };

  protected override readonly size: THexahedronSize = 2;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-0.5, 0.5],
    y: [0.5, -0.5],
    z: [-0.5, 0.5],
  };
}

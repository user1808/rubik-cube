import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import {
  AbstractRubikHexahedronShellData,
  type THexahedronShellPositionValues,
} from '../shell-data';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';

export class RubikHexahedron2x2ShellData extends AbstractRubikHexahedronShellData<THexahedron2x2RotationGroups> {
  protected override readonly horizontalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['X', 'Down'],
      ['X', 'Up', true],
    ],
    Back: [
      ['X', 'Down', true],
      ['X', 'Up'],
    ],
    Right: [
      ['Z', 'Down', true],
      ['Z', 'Up'],
    ],
    Left: [
      ['Z', 'Down'],
      ['Z', 'Up', true],
    ],
    Up: [
      ['X', 'Front'],
      ['X', 'Back', true],
    ],
    Down: [
      ['X', 'Back'],
      ['X', 'Front', true],
    ],
  };
  protected override readonly verticalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['Y', 'Left', true],
      ['Y', 'Right'],
    ],
    Back: [
      ['Y', 'Right', true],
      ['Y', 'Left'],
    ],
    Right: [
      ['Y', 'Front', true],
      ['Y', 'Back'],
    ],
    Left: [
      ['Y', 'Back', true],
      ['Y', 'Front'],
    ],
    Up: [
      ['Z', 'Left'],
      ['Z', 'Right', true],
    ],
    Down: [
      ['Z', 'Left', true],
      ['Z', 'Right'],
    ],
  };
  protected override readonly facePieceInitialPositions: Record<
    THexahedronFaces,
    THexahedronShellPositionValues
  > = {
    Front: { x: [-0.5025, 0.5025], y: [-0.5025, 0.5025], z: [1.005] },
    Back: { x: [0.5025, -0.5025], y: [-0.5025, 0.5025], z: [-1.005] },
    Right: { x: [1.005], y: [-0.5025, 0.5025], z: [0.5025, -0.5025] },
    Left: { x: [-1.005], y: [-0.5025, 0.5025], z: [-0.5025, 0.5025] },
    Up: { x: [-0.5025, 0.5025], y: [1.005], z: [0.5025, -0.5025] },
    Down: { x: [-0.5025, 0.5025], y: [-1.005], z: [-0.5025, 0.5025] },
  };

  public override piecesData: Array<
    TShellPieceData<
      THexahedron2x2RotationGroups,
      THexahedronRotationTypes,
      THexahedronShellFilenames
    >
  > = this.createPiecesData();
}

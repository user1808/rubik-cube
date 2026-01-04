import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import {
  AbstractRubikHexahedronShellData,
  type THexahedronShellPositionValues,
} from '../shell-data';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron3x3ShellData extends AbstractRubikHexahedronShellData<THexahedron3x3RotationGroups> {
  protected override readonly horizontalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['X', 'Down'],
      ['X', 'SliceY'],
      ['X', 'Up', true],
    ],
    Back: [
      ['X', 'Down', true],
      ['X', 'SliceY', true],
      ['X', 'Up'],
    ],
    Right: [
      ['Z', 'Down', true],
      ['Z', 'SliceY', true],
      ['Z', 'Up'],
    ],
    Left: [
      ['Z', 'Down'],
      ['Z', 'SliceY'],
      ['Z', 'Up', true],
    ],
    Up: [
      ['X', 'Front'],
      ['X', 'SliceZ'],
      ['X', 'Back', true],
    ],
    Down: [
      ['X', 'Back'],
      ['X', 'SliceZ', true],
      ['X', 'Front', true],
    ],
  };
  protected override readonly verticalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['Y', 'Left', true],
      ['Y', 'SliceX', true],
      ['Y', 'Right'],
    ],
    Back: [
      ['Y', 'Right', true],
      ['Y', 'SliceX'],
      ['Y', 'Left'],
    ],
    Right: [
      ['Y', 'Front', true],
      ['Y', 'SliceZ', true],
      ['Y', 'Back'],
    ],
    Left: [
      ['Y', 'Back', true],
      ['Y', 'SliceZ'],
      ['Y', 'Front'],
    ],
    Up: [
      ['Z', 'Left'],
      ['Z', 'SliceX'],
      ['Z', 'Right', true],
    ],
    Down: [
      ['Z', 'Left', true],
      ['Z', 'SliceX', true],
      ['Z', 'Right'],
    ],
  };
  protected override readonly facePieceInitialPositions: Record<
    THexahedronFaces,
    THexahedronShellPositionValues
  > = {
    Front: { x: [-1.005, 0, 1.005], y: [-1.005, 0, 1.005], z: [1.5075] },
    Back: { x: [1.005, 0, -1.005], y: [-1.005, 0, 1.005], z: [-1.5075] },
    Right: { x: [1.5075], y: [-1.005, 0, 1.005], z: [1.005, 0, -1.005] },
    Left: { x: [-1.5075], y: [-1.005, 0, 1.005], z: [-1.005, 0, 1.005] },
    Up: { x: [-1.005, 0, 1.005], y: [1.5075], z: [1.005, 0, -1.005] },
    Down: { x: [-1.005, 0, 1.005], y: [-1.5075], z: [-1.005, 0, 1.005] },
  };

  public override piecesData: Array<
    TShellPieceData<
      THexahedron3x3RotationGroups,
      THexahedronRotationTypes,
      THexahedronShellFilenames
    >
  > = this.createPiecesData();
}

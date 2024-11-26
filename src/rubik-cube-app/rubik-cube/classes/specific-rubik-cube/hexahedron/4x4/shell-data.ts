import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import {
  AbstractRubikHexahedronShellData,
  type THexahedronShellPositionValues,
} from '../shell-data';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron4x4ShellData extends AbstractRubikHexahedronShellData<THexahedron4x4RotationGroups> {
  protected override readonly horizontalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['X', 'Down'],
      ['X', 'DownSlice'],
      ['X', 'UpSlice', true],
      ['X', 'Up', true],
    ],
    Back: [
      ['X', 'Down', true],
      ['X', 'DownSlice', true],
      ['X', 'UpSlice'],
      ['X', 'Up'],
    ],
    Right: [
      ['Z', 'Down', true],
      ['Z', 'DownSlice', true],
      ['Z', 'UpSlice'],
      ['Z', 'Up'],
    ],
    Left: [
      ['Z', 'Down'],
      ['Z', 'DownSlice'],
      ['Z', 'UpSlice', true],
      ['Z', 'Up', true],
    ],
    Up: [
      ['X', 'Front'],
      ['X', 'FrontSlice'],
      ['X', 'BackSlice', true],
      ['X', 'Back', true],
    ],
    Down: [
      ['X', 'Back'],
      ['X', 'BackSlice'],
      ['X', 'FrontSlice', true],
      ['X', 'Front', true],
    ],
  };
  protected override readonly verticalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['Y', 'Left', true],
      ['Y', 'LeftSlice', true],
      ['Y', 'RightSlice'],
      ['Y', 'Right'],
    ],
    Back: [
      ['Y', 'Right', true],
      ['Y', 'RightSlice', true],
      ['Y', 'LeftSlice'],
      ['Y', 'Left'],
    ],
    Right: [
      ['Y', 'Front', true],
      ['Y', 'FrontSlice', true],
      ['Y', 'BackSlice'],
      ['Y', 'Back'],
    ],
    Left: [
      ['Y', 'Back', true],
      ['Y', 'BackSlice', true],
      ['Y', 'FrontSlice'],
      ['Y', 'Front'],
    ],
    Up: [
      ['Z', 'Left'],
      ['Z', 'LeftSlice'],
      ['Z', 'RightSlice', true],
      ['Z', 'Right', true],
    ],
    Down: [
      ['Z', 'Left', true],
      ['Z', 'LeftSlice', true],
      ['Z', 'RightSlice'],
      ['Z', 'Right'],
    ],
  };
  protected override readonly facePieceInitialPositions: Record<
    THexahedronFaces,
    THexahedronShellPositionValues
  > = {
    Front: {
      x: [-1.5075, -0.5025, 0.5025, 1.5075],
      y: [-1.5075, -0.5025, 0.5025, 1.5075],
      z: [2.01],
    },
    Back: {
      x: [1.5075, 0.5025, -0.5025, -1.5075],
      y: [-1.5075, -0.5025, 0.5025, 1.5075],
      z: [-2.01],
    },
    Right: {
      x: [2.01],
      y: [-1.5075, -0.5025, 0.5025, 1.5075],
      z: [1.5075, 0.5025, -0.5025, -1.5075],
    },
    Left: {
      x: [-2.01],
      y: [-1.5075, -0.5025, 0.5025, 1.5075],
      z: [-1.5075, -0.5025, 0.5025, 1.5075],
    },
    Up: { x: [-1.5075, -0.5025, 0.5025, 1.5075], y: [2.01], z: [1.5075, 0.5025, -0.5025, -1.5075] },
    Down: {
      x: [-1.5075, -0.5025, 0.5025, 1.5075],
      y: [-2.01],
      z: [-1.5075, -0.5025, 0.5025, 1.5075],
    },
  };

  public override piecesData: Array<
    TShellPieceData<
      THexahedron4x4RotationGroups,
      THexahedronRotationTypes,
      THexahedronShellFilenames
    >
  > = this.createPiecesData();
}

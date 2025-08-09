import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  AbstractRubikHexahedronShellData,
  type THexahedronShellPositionValues,
} from '../shell-data';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';

export class RubikHexahedron5x5ShellData extends AbstractRubikHexahedronShellData<THexahedron5x5RotationGroups> {
  protected override readonly horizontalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['X', 'Down'],
      ['X', 'DownSlice'],
      ['X', 'SliceY'],
      ['X', 'UpSlice', true],
      ['X', 'Up', true],
    ],
    Back: [
      ['X', 'Down', true],
      ['X', 'DownSlice', true],
      ['X', 'SliceY', true],
      ['X', 'UpSlice'],
      ['X', 'Up'],
    ],
    Right: [
      ['Z', 'Down', true],
      ['Z', 'DownSlice', true],
      ['Z', 'SliceY', true],
      ['Z', 'UpSlice'],
      ['Z', 'Up'],
    ],
    Left: [
      ['Z', 'Down'],
      ['Z', 'DownSlice'],
      ['Z', 'SliceY'],
      ['Z', 'UpSlice', true],
      ['Z', 'Up', true],
    ],
    Up: [
      ['X', 'Front'],
      ['X', 'FrontSlice'],
      ['X', 'SliceZ'],
      ['X', 'BackSlice', true],
      ['X', 'Back', true],
    ],
    Down: [
      ['X', 'Back'],
      ['X', 'BackSlice'],
      ['X', 'SliceZ', true],
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
      ['Y', 'SliceX', true],
      ['Y', 'RightSlice'],
      ['Y', 'Right'],
    ],
    Back: [
      ['Y', 'Right', true],
      ['Y', 'RightSlice', true],
      ['Y', 'SliceX'],
      ['Y', 'LeftSlice'],
      ['Y', 'Left'],
    ],
    Right: [
      ['Y', 'Front', true],
      ['Y', 'FrontSlice', true],
      ['Y', 'SliceZ', true],
      ['Y', 'BackSlice'],
      ['Y', 'Back'],
    ],
    Left: [
      ['Y', 'Back', true],
      ['Y', 'BackSlice', true],
      ['Y', 'SliceZ'],
      ['Y', 'FrontSlice'],
      ['Y', 'Front'],
    ],
    Up: [
      ['Z', 'Left'],
      ['Z', 'LeftSlice'],
      ['Z', 'SliceX'],
      ['Z', 'RightSlice', true],
      ['Z', 'Right', true],
    ],
    Down: [
      ['Z', 'Left', true],
      ['Z', 'LeftSlice', true],
      ['Z', 'SliceX', true],
      ['Z', 'RightSlice'],
      ['Z', 'Right'],
    ],
  };
  protected override readonly facePieceInitialPositions: Record<
    THexahedronFaces,
    THexahedronShellPositionValues
  > = {
    Front: { x: [-2.01, -1.005, 0, 1.005, 2.01], y: [-2.01, -1.005, 0, 1.005, 2.01], z: [2.5125] },
    Back: { x: [2.01, 1.005, 0, -1.005, -2.01], y: [-2.01, -1.005, 0, 1.005, 2.01], z: [-2.5125] },
    Right: { x: [2.5125], y: [-2.01, -1.005, 0, 1.005, 2.01], z: [2.01, 1.005, 0, -1.005, -2.01] },
    Left: { x: [-2.5125], y: [-2.01, -1.005, 0, 1.005, 2.01], z: [-2.01, -1.005, 0, 1.005, 2.01] },
    Up: { x: [-2.01, -1.005, 0, 1.005, 2.01], y: [2.5125], z: [2.01, 1.005, 0, -1.005, -2.01] },
    Down: { x: [-2.01, -1.005, 0, 1.005, 2.01], y: [-2.5125], z: [-2.01, -1.005, 0, 1.005, 2.01] },
  };
  public override piecesData: Array<
    TShellPieceData<
      THexahedron5x5RotationGroups,
      THexahedronRotationTypes,
      THexahedronShellFilenames
    >
  > = this.createPiecesData();
}

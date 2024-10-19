import * as THREE from 'three';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedron5x5ShellFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/shell-filename';
import type { THexahedron5x5ShellPieces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/shell-pieces';
import type { THexahedronShellDirections } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-directions';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { AbstractRubikCubeShellData } from '../../shell-data';

export class RubikHexahedron5x5ShellData extends AbstractRubikCubeShellData<
  THexahedron5x5RotationGroups,
  THexahedronRotationTypes,
  THexahedron5x5ShellFilename,
  THexahedron5x5ShellPieces,
  THexahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected override ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected override invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected override directions: Record<THexahedronShellDirections, THREE.Vector3> = {
    X: new THREE.Vector3(1, 0, 0),
    Y: new THREE.Vector3(0, 1, 0),
    Z: new THREE.Vector3(0, 0, 1),
  };

  public override filename: 'RubikHexahedron5x5Shell.glb' = 'RubikHexahedron5x5Shell.glb';
  public override piecesData: Record<
    THexahedron5x5ShellPieces,
    TShellPieceData<THexahedron5x5RotationGroups, THexahedronRotationTypes>
  > = {
    FrontDownRight: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Right'],
    ]),
    FrontDownLeft: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Left', true],
    ]),
    FrontDownCenter: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'SliceX'],
    ]),
    FrontDownMidLeft: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'LeftSlice', true],
    ]),
    FrontDownMidRight: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'RightSlice'],
    ]),
    FrontTopRight: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'Right'],
    ]),
    FrontTopLeft: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'Left', true],
    ]),
    FrontTopCenter: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'SliceX'],
    ]),
    FrontTopMidLeft: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'LeftSlice', true],
    ]),
    FrontTopMidRight: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'RightSlice'],
    ]),
    FrontMidTopRight: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'Right'],
    ]),
    FrontMidTopLeft: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'Left', true],
    ]),
    FrontMidTopCenter: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'SliceX'],
    ]),
    FrontMidTopMidLeft: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'LeftSlice', true],
    ]),
    FrontMidTopMidRight: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'RightSlice'],
    ]),
    FrontCenterRight: this.createPieceRotationData([
      ['X', 'SliceY', true],
      ['Y', 'Right'],
    ]),
    FrontCenterLeft: this.createPieceRotationData([
      ['X', 'SliceY', true],
      ['Y', 'Left', true],
    ]),
    FrontCenterCenter: this.createPieceRotationData([
      ['X', 'SliceY', true],
      ['Y', 'SliceX'],
    ]),
    FrontCenterMidLeft: this.createPieceRotationData([
      ['X', 'SliceY', true],
      ['Y', 'LeftSlice', true],
    ]),
    FrontCenterMidRight: this.createPieceRotationData([
      ['X', 'SliceY', true],
      ['Y', 'RightSlice'],
    ]),
    FrontMidDownRight: this.createPieceRotationData([
      ['X', 'DownSlice'],
      ['Y', 'Right'],
    ]),
    FrontMidDownLeft: this.createPieceRotationData([
      ['X', 'DownSlice'],
      ['Y', 'Left', true],
    ]),
    FrontMidDownCenter: this.createPieceRotationData([
      ['X', 'DownSlice'],
      ['Y', 'SliceX'],
    ]),
    FrontMidDownMidLeft: this.createPieceRotationData([
      ['X', 'DownSlice'],
      ['Y', 'LeftSlice', true],
    ]),
    FrontMidDownMidRight: this.createPieceRotationData([
      ['X', 'DownSlice'],
      ['Y', 'RightSlice'],
    ]),
    BackDownRight: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'Left'],
    ]),
    BackDownLeft: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'Right', true],
    ]),
    BackDownCenter: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'SliceX', true],
    ]),
    BackDownMidLeft: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'RightSlice', true],
    ]),
    BackDownMidRight: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'LeftSlice'],
    ]),
    BackTopRight: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'Left'],
    ]),
    BackTopLeft: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'Right', true],
    ]),
    BackTopCenter: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'SliceX', true],
    ]),
    BackTopMidLeft: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'RightSlice', true],
    ]),
    BackTopMidRight: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'LeftSlice'],
    ]),
    BackMidTopRight: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'Left'],
    ]),
    BackMidTopLeft: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'Right', true],
    ]),
    BackMidTopCenter: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'SliceX', true],
    ]),
    BackMidTopMidLeft: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'RightSlice', true],
    ]),
    BackMidTopMidRight: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'LeftSlice'],
    ]),
    BackCenterRight: this.createPieceRotationData([
      ['X', 'SliceY'],
      ['Y', 'Left'],
    ]),
    BackCenterLeft: this.createPieceRotationData([
      ['X', 'SliceY'],
      ['Y', 'Right', true],
    ]),
    BackCenterCenter: this.createPieceRotationData([
      ['X', 'SliceY'],
      ['Y', 'SliceX', true],
    ]),
    BackCenterMidLeft: this.createPieceRotationData([
      ['X', 'SliceY'],
      ['Y', 'RightSlice', true],
    ]),
    BackCenterMidRight: this.createPieceRotationData([
      ['X', 'SliceY'],
      ['Y', 'LeftSlice'],
    ]),
    BackMidDownRight: this.createPieceRotationData([
      ['X', 'DownSlice', true],
      ['Y', 'Left'],
    ]),
    BackMidDownLeft: this.createPieceRotationData([
      ['X', 'DownSlice', true],
      ['Y', 'Right', true],
    ]),
    BackMidDownCenter: this.createPieceRotationData([
      ['X', 'DownSlice', true],
      ['Y', 'SliceX', true],
    ]),
    BackMidDownMidLeft: this.createPieceRotationData([
      ['X', 'DownSlice', true],
      ['Y', 'RightSlice', true],
    ]),
    BackMidDownMidRight: this.createPieceRotationData([
      ['X', 'DownSlice', true],
      ['Y', 'LeftSlice'],
    ]),
    RightDownRight: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'Back'],
    ]),
    RightDownLeft: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'Front', true],
    ]),
    RightDownCenter: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'SliceZ', true],
    ]),
    RightDownMidLeft: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'FrontSlice', true],
    ]),
    RightDownMidRight: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'BackSlice'],
    ]),
    RightTopRight: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'Back'],
    ]),
    RightTopLeft: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'Front', true],
    ]),
    RightTopCenter: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'SliceZ', true],
    ]),
    RightTopMidLeft: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'FrontSlice', true],
    ]),
    RightTopMidRight: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'BackSlice'],
    ]),
    RightMidTopRight: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'Back'],
    ]),
    RightMidTopLeft: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'Front', true],
    ]),
    RightMidTopCenter: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'SliceZ', true],
    ]),
    RightMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'FrontSlice', true],
    ]),
    RightMidTopMidRight: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'BackSlice'],
    ]),
    RightCenterRight: this.createPieceRotationData([
      ['Z', 'SliceY'],
      ['Y', 'Back'],
    ]),
    RightCenterLeft: this.createPieceRotationData([
      ['Z', 'SliceY'],
      ['Y', 'Front', true],
    ]),
    RightCenterCenter: this.createPieceRotationData([
      ['Z', 'SliceY'],
      ['Y', 'SliceZ', true],
    ]),
    RightCenterMidLeft: this.createPieceRotationData([
      ['Z', 'SliceY'],
      ['Y', 'FrontSlice', true],
    ]),
    RightCenterMidRight: this.createPieceRotationData([
      ['Z', 'SliceY'],
      ['Y', 'BackSlice'],
    ]),
    RightMidDownRight: this.createPieceRotationData([
      ['Z', 'DownSlice', true],
      ['Y', 'Back'],
    ]),
    RightMidDownLeft: this.createPieceRotationData([
      ['Z', 'DownSlice', true],
      ['Y', 'Front', true],
    ]),
    RightMidDownCenter: this.createPieceRotationData([
      ['Z', 'DownSlice', true],
      ['Y', 'SliceZ', true],
    ]),
    RightMidDownMidLeft: this.createPieceRotationData([
      ['Z', 'DownSlice', true],
      ['Y', 'FrontSlice', true],
    ]),
    RightMidDownMidRight: this.createPieceRotationData([
      ['Z', 'DownSlice', true],
      ['Y', 'BackSlice'],
    ]),
    LeftDownRight: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'Front'],
    ]),
    LeftDownLeft: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'Back', true],
    ]),
    LeftDownCenter: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'SliceZ'],
    ]),
    LeftDownMidLeft: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'BackSlice', true],
    ]),
    LeftDownMidRight: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'FrontSlice'],
    ]),
    LeftTopRight: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'Front'],
    ]),
    LeftTopLeft: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'Back', true],
    ]),
    LeftTopCenter: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'SliceZ'],
    ]),
    LeftTopMidLeft: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'BackSlice', true],
    ]),
    LeftTopMidRight: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'FrontSlice'],
    ]),
    LeftMidTopRight: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'Front'],
    ]),
    LeftMidTopLeft: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'Back', true],
    ]),
    LeftMidTopCenter: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'SliceZ'],
    ]),
    LeftMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'BackSlice', true],
    ]),
    LeftMidTopMidRight: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'FrontSlice'],
    ]),
    LeftCenterRight: this.createPieceRotationData([
      ['Z', 'SliceY', true],
      ['Y', 'Front'],
    ]),
    LeftCenterLeft: this.createPieceRotationData([
      ['Z', 'SliceY', true],
      ['Y', 'Back', true],
    ]),
    LeftCenterCenter: this.createPieceRotationData([
      ['Z', 'SliceY', true],
      ['Y', 'SliceZ'],
    ]),
    LeftCenterMidLeft: this.createPieceRotationData([
      ['Z', 'SliceY', true],
      ['Y', 'BackSlice', true],
    ]),
    LeftCenterMidRight: this.createPieceRotationData([
      ['Z', 'SliceY', true],
      ['Y', 'FrontSlice'],
    ]),
    LeftMidDownRight: this.createPieceRotationData([
      ['Z', 'DownSlice'],
      ['Y', 'Front'],
    ]),
    LeftMidDownLeft: this.createPieceRotationData([
      ['Z', 'DownSlice'],
      ['Y', 'Back', true],
    ]),
    LeftMidDownCenter: this.createPieceRotationData([
      ['Z', 'DownSlice'],
      ['Y', 'SliceZ'],
    ]),
    LeftMidDownMidLeft: this.createPieceRotationData([
      ['Z', 'DownSlice'],
      ['Y', 'BackSlice', true],
    ]),
    LeftMidDownMidRight: this.createPieceRotationData([
      ['Z', 'DownSlice'],
      ['Y', 'FrontSlice'],
    ]),
    UpDownRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'Front'],
    ]),
    UpDownLeft: this.createPieceRotationData([
      ['Z', 'Left'],
      ['X', 'Front'],
    ]),
    UpDownCenter: this.createPieceRotationData([
      ['Z', 'SliceX', true],
      ['X', 'Front'],
    ]),
    UpDownMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'Front'],
    ]),
    UpDownMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'Front'],
    ]),
    UpTopRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'Back', true],
    ]),
    UpTopLeft: this.createPieceRotationData([
      ['Z', 'Left'],
      ['X', 'Back', true],
    ]),
    UpTopCenter: this.createPieceRotationData([
      ['Z', 'SliceX', true],
      ['X', 'Back', true],
    ]),
    UpTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'Back', true],
    ]),
    UpTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'Back', true],
    ]),
    UpMidTopRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'BackSlice', true],
    ]),
    UpMidTopLeft: this.createPieceRotationData([
      ['Z', 'Left'],
      ['X', 'BackSlice', true],
    ]),
    UpMidTopCenter: this.createPieceRotationData([
      ['Z', 'SliceX', true],
      ['X', 'BackSlice', true],
    ]),
    UpMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'BackSlice', true],
    ]),
    UpMidTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'BackSlice', true],
    ]),
    UpCenterRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'SliceZ'],
    ]),
    UpCenterLeft: this.createPieceRotationData([
      ['Z', 'Left'],
      ['X', 'SliceZ'],
    ]),
    UpCenterCenter: this.createPieceRotationData([
      ['Z', 'SliceX', true],
      ['X', 'SliceZ'],
    ]),
    UpCenterMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'SliceZ'],
    ]),
    UpCenterMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'SliceZ'],
    ]),
    UpMidDownRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'FrontSlice'],
    ]),
    UpMidDownLeft: this.createPieceRotationData([
      ['Z', 'Left'],
      ['X', 'FrontSlice'],
    ]),
    UpMidDownCenter: this.createPieceRotationData([
      ['Z', 'SliceX', true],
      ['X', 'FrontSlice'],
    ]),
    UpMidDownMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'FrontSlice'],
    ]),
    UpMidDownMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'FrontSlice'],
    ]),
    DownDownRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'Back'],
    ]),
    DownDownLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
      ['X', 'Back'],
    ]),
    DownDownCenter: this.createPieceRotationData([
      ['Z', 'SliceX'],
      ['X', 'Back'],
    ]),
    DownDownMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'Back'],
    ]),
    DownDownMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'Back'],
    ]),
    DownTopRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'Front', true],
    ]),
    DownTopLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
      ['X', 'Front', true],
    ]),
    DownTopCenter: this.createPieceRotationData([
      ['Z', 'SliceX'],
      ['X', 'Front', true],
    ]),
    DownTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'Front', true],
    ]),
    DownTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'Front', true],
    ]),
    DownMidTopRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'FrontSlice', true],
    ]),
    DownMidTopLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
      ['X', 'FrontSlice', true],
    ]),
    DownMidTopCenter: this.createPieceRotationData([
      ['Z', 'SliceX'],
      ['X', 'FrontSlice', true],
    ]),
    DownMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'FrontSlice', true],
    ]),
    DownMidTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'FrontSlice', true],
    ]),
    DownCenterRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'SliceZ', true],
    ]),
    DownCenterLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
      ['X', 'SliceZ', true],
    ]),
    DownCenterCenter: this.createPieceRotationData([
      ['Z', 'SliceX'],
      ['X', 'SliceZ', true],
    ]),
    DownCenterMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'SliceZ', true],
    ]),
    DownCenterMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'SliceZ', true],
    ]),
    DownMidDownRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'BackSlice'],
    ]),
    DownMidDownLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
      ['X', 'BackSlice'],
    ]),
    DownMidDownCenter: this.createPieceRotationData([
      ['Z', 'SliceX'],
      ['X', 'BackSlice'],
    ]),
    DownMidDownMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'BackSlice'],
    ]),
    DownMidDownMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'BackSlice'],
    ]),
  };
}

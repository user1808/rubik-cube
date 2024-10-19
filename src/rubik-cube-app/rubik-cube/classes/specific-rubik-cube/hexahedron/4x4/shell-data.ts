import * as THREE from 'three';
import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { THexahedron4x4ShellFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/shell-filename';
import type { THexahedron4x4ShellPieces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/shell-pieces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronShellDirections } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-directions';
import { AbstractRubikCubeShellData } from '../../shell-data';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikHexahedron4x4ShellData extends AbstractRubikCubeShellData<
  THexahedron4x4RotationGroups,
  THexahedronRotationTypes,
  THexahedron4x4ShellFilename,
  THexahedron4x4ShellPieces,
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

  public override filename: 'RubikHexahedron4x4Shell.glb' = 'RubikHexahedron4x4Shell.glb';
  public override piecesData: Record<
    THexahedron4x4ShellPieces,
    TShellPieceData<THexahedron4x4RotationGroups, THexahedronRotationTypes>
  > = {
    FrontDownRight: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Right'],
    ]),
    FrontDownLeft: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Left', true],
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
    FrontMidTopMidLeft: this.createPieceRotationData([
      ['X', 'UpSlice', true],
      ['Y', 'LeftSlice', true],
    ]),
    FrontMidTopMidRight: this.createPieceRotationData([
      ['X', 'UpSlice', true],
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
    BackMidTopMidLeft: this.createPieceRotationData([
      ['X', 'UpSlice'],
      ['Y', 'RightSlice', true],
    ]),
    BackMidTopMidRight: this.createPieceRotationData([
      ['X', 'UpSlice'],
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
    RightMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'UpSlice'],
      ['Y', 'FrontSlice', true],
    ]),
    RightMidTopMidRight: this.createPieceRotationData([
      ['Z', 'UpSlice'],
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
    LeftMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
      ['Y', 'BackSlice', true],
    ]),
    LeftMidTopMidRight: this.createPieceRotationData([
      ['Z', 'UpSlice', true],
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
    UpMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice'],
      ['X', 'BackSlice', true],
    ]),
    UpMidTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice', true],
      ['X', 'BackSlice', true],
    ]),
    UpMidDownRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'FrontSlice'],
    ]),
    UpMidDownLeft: this.createPieceRotationData([
      ['Z', 'Left'],
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
    DownMidTopMidLeft: this.createPieceRotationData([
      ['Z', 'LeftSlice', true],
      ['X', 'FrontSlice', true],
    ]),
    DownMidTopMidRight: this.createPieceRotationData([
      ['Z', 'RightSlice'],
      ['X', 'FrontSlice', true],
    ]),
    DownMidDownRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'BackSlice'],
    ]),
    DownMidDownLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
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

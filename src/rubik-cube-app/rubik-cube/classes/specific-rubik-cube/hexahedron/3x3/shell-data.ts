import * as THREE from 'three';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedron3x3ShellFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/shell-filename';
import type { THexahedron3x3ShellPieces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/shell-pieces';
import type { THexahedronShellDirections } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-directions';
import { AbstractRubikCubeShellData } from '../../shell-data';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikHexahedron3x3ShellData extends AbstractRubikCubeShellData<
  THexahedron3x3RotationGroups,
  THexahedronRotationTypes,
  THexahedron3x3ShellFilename,
  THexahedron3x3ShellPieces,
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

  public override filename: 'RubikHexahedron3x3Shell.glb' = 'RubikHexahedron3x3Shell.glb';
  public override piecesData: Record<
    THexahedron3x3ShellPieces,
    TShellPieceData<THexahedron3x3RotationGroups, THexahedronRotationTypes>
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
  };
}

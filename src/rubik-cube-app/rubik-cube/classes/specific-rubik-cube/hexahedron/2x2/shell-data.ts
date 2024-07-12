import * as THREE from 'three';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedron2x2ShellFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/shell-filename';
import type { THexahedron2x2ShellPieces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/shell-pieces';
import type { THexahedronShellDirections } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-directions';
import { AbstractRubikCubeShellData } from '../../shell-data';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikHexahedron2x2ShellData extends AbstractRubikCubeShellData<
  THexahedron2x2RotationGroups,
  THexahedronRotationTypes,
  THexahedron2x2ShellFilename,
  THexahedron2x2ShellPieces,
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

  public override filename: 'RubikHexahedron2x2Shell.glb' = 'RubikHexahedron2x2Shell.glb';
  public override piecesData: Record<
    THexahedron2x2ShellPieces,
    TShellPieceData<THexahedron2x2RotationGroups, THexahedronRotationTypes>
  > = {
    FrontDownRight: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Right'],
    ]),
    FrontDownLeft: this.createPieceRotationData([
      ['X', 'Down'],
      ['Y', 'Left', true],
    ]),
    FrontTopRight: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'Right'],
    ]),
    FrontTopLeft: this.createPieceRotationData([
      ['X', 'Up', true],
      ['Y', 'Left', true],
    ]),
    BackDownRight: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'Left'],
    ]),
    BackDownLeft: this.createPieceRotationData([
      ['X', 'Down', true],
      ['Y', 'Right', true],
    ]),
    BackTopRight: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'Left'],
    ]),
    BackTopLeft: this.createPieceRotationData([
      ['X', 'Up'],
      ['Y', 'Right', true],
    ]),
    RightDownRight: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'Back'],
    ]),
    RightDownLeft: this.createPieceRotationData([
      ['Z', 'Down', true],
      ['Y', 'Front', true],
    ]),
    RightTopRight: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'Back'],
    ]),
    RightTopLeft: this.createPieceRotationData([
      ['Z', 'Up'],
      ['Y', 'Front', true],
    ]),
    LeftDownRight: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'Front'],
    ]),
    LeftDownLeft: this.createPieceRotationData([
      ['Z', 'Down'],
      ['Y', 'Back', true],
    ]),
    LeftTopRight: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'Front'],
    ]),
    LeftTopLeft: this.createPieceRotationData([
      ['Z', 'Up', true],
      ['Y', 'Back', true],
    ]),
    UpDownRight: this.createPieceRotationData([
      ['Z', 'Right', true],
      ['X', 'Front'],
    ]),
    UpDownLeft: this.createPieceRotationData([
      ['Z', 'Left'],
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
    DownDownRight: this.createPieceRotationData([
      ['Z', 'Right'],
      ['X', 'Back'],
    ]),
    DownDownLeft: this.createPieceRotationData([
      ['Z', 'Left', true],
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
  };
}

import * as THREE from 'three';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellDirections,
  TTetrahedronShellFilename,
  TTetrahedronShellPieces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { AbstractRubikCubeShellData } from '../shell-data';

export class RubikTetrahedronShellData extends AbstractRubikCubeShellData<
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilename,
  TTetrahedronShellPieces,
  TTetrahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected readonly ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected readonly invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected readonly directions: Record<TTetrahedronShellDirections, THREE.Vector3> = {
    DirectionA: new THREE.Vector3(-0.3, -0.82, 0.5),
    DirectionB: new THREE.Vector3(-0.57, 0.82, 0),
    DirectionC: new THREE.Vector3(-0.87, 0, 0.5),
    DirectionD: new THREE.Vector3(0.3, 0.82, 0.5),
    DirectionE: new THREE.Vector3(0.87, 0, 0.5),
    DirectionF: new THREE.Vector3(0, 0, -1),
  };

  public readonly filename: TTetrahedronShellFilename = 'RubikTetrahedronShell.glb';
  public readonly piecesData: Record<
    TTetrahedronShellPieces,
    TShellPieceData<TTetrahedronRotationGroups, TTetrahedronRotationTypes>
  > = {
    FrontTop: this.createPieceRotationData([
      ['DirectionA', 'Left'],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpCorner'],
    ]),
    FrontMiddle: this.createPieceRotationData([
      ['DirectionA', 'Left'],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpMidLayer'],
    ]),
    FrontMiddleRight: this.createPieceRotationData([
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpMidLayer'],
    ]),
    FrontMiddleLeft: this.createPieceRotationData([
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'UpMidLayer'],
    ]),
    FrontBottom: this.createPieceRotationData([
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'Down', true],
    ]),
    FrontBottomLeft: this.createPieceRotationData([
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'Down', true],
    ]),
    FrontBottomLeftCorner: this.createPieceRotationData([
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftCorner', true],
      ['DirectionC', 'Down', true],
    ]),
    FrontBottomRight: this.createPieceRotationData([
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'Down', true],
    ]),
    FrontBottomRightCorner: this.createPieceRotationData([
      ['DirectionA', 'RightCorner', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'Down', true],
    ]),

    RightTop: this.createPieceRotationData([
      ['DirectionB', 'Front', true],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpCorner'],
    ]),
    RightMiddle: this.createPieceRotationData([
      ['DirectionB', 'Front', true],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpMidLayer'],
    ]),
    RightMiddleRight: this.createPieceRotationData([
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpMidLayer'],
    ]),
    RightMiddleLeft: this.createPieceRotationData([
      ['DirectionB', 'Front', true],
      ['DirectionD', 'RightMidLayer', true],
      ['DirectionE', 'UpMidLayer'],
    ]),
    RightBottom: this.createPieceRotationData([
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'RightMidLayer'],
      ['DirectionE', 'Down', true],
    ]),
    RightBottomLeft: this.createPieceRotationData([
      ['DirectionB', 'Front'],
      ['DirectionD', 'RightMidLayer'],
      ['DirectionE', 'Down', true],
    ]),
    RightBottomLeftCorner: this.createPieceRotationData([
      ['DirectionB', 'Front'],
      ['DirectionD', 'RightCorner'],
      ['DirectionE', 'Down', true],
    ]),
    RightBottomRight: this.createPieceRotationData([
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'Down', true],
    ]),
    RightBottomRightCorner: this.createPieceRotationData([
      ['DirectionB', 'BackCorner'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'Down', true],
    ]),

    LeftTop: this.createPieceRotationData([
      ['DirectionD', 'Right', true],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpCorner'],
    ]),
    LeftMiddle: this.createPieceRotationData([
      ['DirectionD', 'Right', true],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpMidLayer'],
    ]),
    LeftMiddleRight: this.createPieceRotationData([
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpMidLayer'],
    ]),
    LeftMiddleLeft: this.createPieceRotationData([
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'UpMidLayer'],
    ]),
    LeftBottom: this.createPieceRotationData([
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'Down', true],
    ]),
    LeftBottomLeft: this.createPieceRotationData([
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'Down', true],
    ]),
    LeftBottomLeftCorner: this.createPieceRotationData([
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackCorner'],
      ['DirectionF', 'Down', true],
    ]),
    LeftBottomRight: this.createPieceRotationData([
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'Down', true],
    ]),
    LeftBottomRightCorner: this.createPieceRotationData([
      ['DirectionD', 'LeftCorner'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'Down', true],
    ]),

    DownTop: this.createPieceRotationData([
      ['DirectionE', 'Right'],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackCorner', true],
    ]),
    DownMiddle: this.createPieceRotationData([
      ['DirectionE', 'Right'],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackMidLayer', true],
    ]),
    DownMiddleRight: this.createPieceRotationData([
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackMidLayer', true],
    ]),
    DownMiddleLeft: this.createPieceRotationData([
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'BackMidLayer', true],
    ]),
    DownBottom: this.createPieceRotationData([
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'Front'],
    ]),
    DownBottomLeft: this.createPieceRotationData([
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'Front'],
    ]),
    DownBottomLeftCorner: this.createPieceRotationData([
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightCorner', true],
      ['DirectionC', 'Front'],
    ]),
    DownBottomRight: this.createPieceRotationData([
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'Front'],
    ]),
    DownBottomRightCorner: this.createPieceRotationData([
      ['DirectionE', 'LeftCorner', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'Front'],
    ]),
  };
}

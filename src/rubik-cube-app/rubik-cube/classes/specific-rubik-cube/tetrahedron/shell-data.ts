import * as THREE from 'three';
import type { IRubikCubeShellData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilename,
  TTetrahedronShellPieces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronShellData
  implements
    IRubikCubeShellData<
      TTetrahedronRotationGroups,
      TTetrahedronRotationTypes,
      TTetrahedronShellFilename,
      TTetrahedronShellPieces
    >
{
  readonly filename: 'RubikTetrahedronShell.glb' = 'RubikTetrahedronShell.glb';
  readonly piecesData: Record<
    TTetrahedronShellPieces,
    TShellPieceData<TTetrahedronRotationGroups, TTetrahedronRotationTypes>
  > = {
    FrontTop: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'UpCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'UpCorner',
        rotationType: 'Clockwise',
      },
    ],
    FrontMiddle: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
    ],
    FrontMiddleRight: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
    ],
    FrontMiddleLeft: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
    ],
    FrontBottom: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
    ],
    FrontBottomLeft: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
    ],
    FrontBottomLeftCorner: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'LeftCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'LeftCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
    ],
    FrontBottomRight: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
    ],
    FrontBottomRightCorner: [
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'RightCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'RightCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
    ],

    RightTop: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'UpCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'UpCorner',
        rotationType: 'CounterClockwise',
      },
    ],
    RightMiddle: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    RightMiddleRight: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    RightMiddleLeft: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    RightBottom: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    RightBottomLeft: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    RightBottomLeftCorner: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'RightCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'RightCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    RightBottomRight: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    RightBottomRightCorner: [
      {
        direction: new THREE.Vector3(-0.57, 0.82, 0),
        rotationGroup: 'BackCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.57, -0.82, 0),
        rotationGroup: 'BackCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],

    LeftTop: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'UpCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'UpCorner',
        rotationType: 'CounterClockwise',
      },
    ],
    LeftMiddle: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    LeftMiddleRight: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    LeftMiddleLeft: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'UpMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    LeftBottom: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    LeftBottomLeft: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    LeftBottomLeftCorner: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'BackCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'BackCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    LeftBottomRight: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],
    LeftBottomRightCorner: [
      {
        direction: new THREE.Vector3(0.3, 0.82, 0.5),
        rotationGroup: 'LeftCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, -0.5),
        rotationGroup: 'LeftCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.3, 0.82, -0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.3, -0.82, 0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Down',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Down',
        rotationType: 'Clockwise',
      },
    ],

    DownTop: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'BackCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'BackCorner',
        rotationType: 'CounterClockwise',
      },
    ],
    DownMiddle: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    DownMiddleRight: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    DownMiddleLeft: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'BackMidLayer',
        rotationType: 'CounterClockwise',
      },
    ],
    DownBottom: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
    ],
    DownBottomLeft: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'RightMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
    ],
    DownBottomLeftCorner: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'Right',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'Right',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'RightCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'RightCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
    ],
    DownBottomRight: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'LeftMidLayer',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
    ],
    DownBottomRightCorner: [
      {
        direction: new THREE.Vector3(-0.87, 0, -0.5),
        rotationGroup: 'LeftCorner',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, 0.5),
        rotationGroup: 'LeftCorner',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, -1),
        rotationGroup: 'Left',
        rotationType: 'Clockwise',
      },
      {
        direction: new THREE.Vector3(0, 0, 1),
        rotationGroup: 'Left',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(0.87, 0, -0.5),
        rotationGroup: 'Front',
        rotationType: 'CounterClockwise',
      },
      {
        direction: new THREE.Vector3(-0.87, 0, 0.5),
        rotationGroup: 'Front',
        rotationType: 'Clockwise',
      },
    ],
  };
}

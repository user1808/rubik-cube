import * as THREE from 'three';
import type {
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilenames,
  TDodecahedronShellDirections,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { AbstractRubikCubeShellData } from '../shell-data';
import { Radians } from '@/utils/radians';
import type { TShellPieceDataInitRotation } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/shell/shell-piece-data';

type TDodecahedronShellValues = Record<'x' | 'y' | 'z', Array<number>>;

export class RubikDodecahedronShellData extends AbstractRubikCubeShellData<
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilenames,
  TDodecahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected readonly ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected readonly invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected readonly directions: Record<TDodecahedronShellDirections, THREE.Vector3> = {
    DirectionA: new THREE.Vector3(0, -0.86, -0.53),
    DirectionB: new THREE.Vector3(0, 0.53, -0.86),
    DirectionC: new THREE.Vector3(0.31, 0, -0.95),
    DirectionD: new THREE.Vector3(0.31, 0, 0.95),
    DirectionE: new THREE.Vector3(0.31, -0.86, 0.425),
    DirectionF: new THREE.Vector3(-0.31, -0.86, 0.425),
    DirectionG: new THREE.Vector3(-0.31, 0.86, 0.425),
    DirectionH: new THREE.Vector3(0.53, -0.53, -0.69),
    DirectionI: new THREE.Vector3(0.53, 0.53, 0.69),
    DirectionJ: new THREE.Vector3(-0.53, -0.86, -0.17),
    DirectionK: new THREE.Vector3(0.53, -0.86, -0.17),
    DirectionL: new THREE.Vector3(-0.81, 0, -0.59),
    DirectionM: new THREE.Vector3(-0.81, 0, 0.59),
    DirectionN: new THREE.Vector3(0.81, -0.53, 0.26),
    DirectionO: new THREE.Vector3(0.81, 0.53, -0.26),
    DirectionP: new THREE.Vector3(1, 0, 0),
  };

  public readonly piecesFilenames: Array<TDodecahedronShellFilenames> = [
    'DodecahedronShellDownFacePart.glb',
    'DodecahedronShellDownEdgePart.glb',
    'DodecahedronShellDownVertexPart.glb',
    'DodecahedronShellFrontFacePart.glb',
    'DodecahedronShellFrontEdgePart.glb',
    'DodecahedronShellFrontVertexPart.glb',
    'DodecahedronShellLeftFacePart.glb',
    'DodecahedronShellLeftEdgePart.glb',
    'DodecahedronShellLeftVertexPart.glb',
    'DodecahedronShellRightFacePart.glb',
    'DodecahedronShellRightEdgePart.glb',
    'DodecahedronShellRightVertexPart.glb',
    'DodecahedronShellDownLeftFacePart.glb',
    'DodecahedronShellDownLeftEdgePart.glb',
    'DodecahedronShellDownLeftVertexPart.glb',
    'DodecahedronShellDownRightFacePart.glb',
    'DodecahedronShellDownRightEdgePart.glb',
    'DodecahedronShellDownRightVertexPart.glb',
  ];

  protected readonly pieceFilnemesIdxs: Record<TDodecahedronFaces, Array<number>> = {
    Up: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0],
    Down: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0],
    Right: [10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 9],
    BackLeft: [10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 9],
    Front: [4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 3],
    Back: [4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 3],
    Left: [7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 6],
    BackRight: [7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 6],
    UpLeft: [16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 15],
    DownRight: [16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 15],
    UpRight: [13, 14, 13, 14, 13, 14, 13, 14, 13, 14, 12],
    DownLeft: [13, 14, 13, 14, 13, 14, 13, 14, 13, 14, 12],
  };

  protected readonly axes: Partial<
    Record<TDodecahedronRotationGroups, TShellPieceDataInitRotation['axes']>
  > = {
    Up: { y: new THREE.Vector3(0, 1, 0) },
    Down: { y: new THREE.Vector3(0, -1, 0) },
    Right: { y: new THREE.Vector3(0.85065, 0.4472, 0.2764) },
    BackLeft: { z: new THREE.Vector3(-0.85065, -0.4472, -0.2764) },
    Front: { y: new THREE.Vector3(0, 0.4472, 0.8944) },
    Back: { y: new THREE.Vector3(0, -0.4472, -0.8944) },
    Left: { y: new THREE.Vector3(-0.85065, 0.4472, 0.2764) },
    BackRight: { z: new THREE.Vector3(0.85065, -0.4472, -0.2764) },
    UpLeft: { z: new THREE.Vector3(-0.5257, 0.4472, -0.7236) },
    DownRight: { y: new THREE.Vector3(0.5257, -0.4472, 0.7236) },
    UpRight: { z: new THREE.Vector3(0.5257, 0.4472, -0.7236) },
    DownLeft: { y: new THREE.Vector3(-0.5257, -0.4472, 0.7236) },
  };

  private readonly zerosRotation: Array<number> = Array(11).fill(0);
  private readonly angle180Rotation: Array<number> = Array(11).fill(Radians['180deg']);
  private readonly angle144Rotation: Array<number> = Array(11).fill(Radians['144deg']);
  private readonly adjustAngles: Array<number> = [
    0,
    Radians['36deg'],
    Radians['72deg'],
    -Radians['72deg'],
    Radians['144deg'],
    0,
    -Radians['144deg'],
    Radians['72deg'],
    -Radians['72deg'],
    -Radians['36deg'],
    0,
  ];

  protected readonly facePieceInitialRotations: Record<
    TDodecahedronFaces,
    TDodecahedronShellValues
  > = {
    Down: {
      x: this.zerosRotation,
      y: this.adjustAngles.map((angle) => -angle),
      z: this.zerosRotation,
    },
    Left: {
      x: this.zerosRotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
    Front: {
      x: this.zerosRotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
    Right: {
      x: this.zerosRotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
    Up: {
      x: this.zerosRotation,
      y: [
        Radians['180deg'],
        -Radians['36deg'],
        Radians['108deg'],
        Radians['72deg'],
        Radians['36deg'],
        Radians['180deg'],
        -Radians['36deg'],
        -Radians['72deg'],
        -Radians['108deg'],
        Radians['36deg'],
        Radians['36deg'],
      ],
      z: this.angle180Rotation,
    },
    BackLeft: {
      x: this.angle180Rotation,
      y: this.angle144Rotation,
      z: this.adjustAngles.map((angle) => -angle),
    },
    Back: {
      x: this.angle180Rotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
    BackRight: {
      x: this.angle180Rotation,
      y: this.angle144Rotation.map((angle) => -angle),
      z: this.adjustAngles.map((angle) => -angle),
    },
    UpLeft: {
      x: this.angle180Rotation,
      y: this.angle144Rotation.map((angle) => 0.5 * angle),
      z: this.adjustAngles.map((angle) => -angle),
    },
    DownRight: {
      x: this.zerosRotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
    UpRight: {
      x: this.angle180Rotation,
      y: this.angle144Rotation.map((angle) => -0.5 * angle),
      z: this.adjustAngles.map((angle) => -angle),
    },
    DownLeft: {
      x: this.zerosRotation,
      y: this.adjustAngles,
      z: this.zerosRotation,
    },
  };

  protected readonly facePieceInitialPositions: Record<
    TDodecahedronFaces,
    TDodecahedronShellValues
  > = {
    Down: {
      x: [0, -0.68, -0.89, -1.1, -0.55, 0, 0.55, 1.1, 0.89, 0.68, 0],
      y: [-2.207, -2.207, -2.207, -2.207, -2.207, -2.207, -2.207, -2.207, -2.207, -2.207, -2.207],
      z: [-0.936, -0.936, -0.289, 0.357, 0.757, 1.157, 0.757, 0.357, -0.289, -0.936, 0],
    },
    Left: {
      x: [-1.48, -1.69, -2.03, -2.37, -2.37, -2.37, -2.03, -1.69, -1.48, -1.269, -1.877],
      y: [1.824, 1.824, 1.246, 0.667, 0.31, -0.04, 0.31, 0.667, 1.246, 1.824, 0.987],
      z: [0.48, -0.166, -0.276, -0.387, 0.191, 0.77, 1.24, 1.7, 1.42, 1.128, 0.61],
    },
    Front: {
      x: [0, -0.68, -0.89, -1.1, -0.55, 0, 0.55, 1.1, 0.89, 0.68, 0],
      y: [1.824, 1.824, 1.246, 0.667, 0.31, -0.04, 0.31, 0.667, 1.246, 1.824, 0.987],
      z: [1.555, 1.555, 1.845, 2.134, 2.313, 2.49, 2.313, 2.134, 1.845, 1.555, 1.974],
    },
    Right: {
      x: [1.48, 1.27, 1.48, 1.69, 2.03, 2.37, 2.37, 2.37, 2.03, 1.69, 1.878],
      y: [1.824, 1.824, 1.246, 0.667, 0.31, -0.04, 0.31, 0.667, 1.246, 1.824, 0.987],
      z: [0.48, 1.128, 1.417, 1.706, 1.24, 0.78, 0.191, -0.387, -0.277, -0.166, 0.61],
    },
    Up: {
      x: [0, 0.68, 0.89, 1.1, 0.55, 0, -0.55, -1.1, -0.89, -0.68, 0],
      y: [2.207, 2.207, 2.207, 2.207, 2.207, 2.207, 2.207, 2.207, 2.207, 2.207, 2.207],
      z: [0.936, 0.936, 0.289, -0.357, -0.757, -1.157, -0.757, -0.357, 0.289, 0.936, 0],
    },
    BackLeft: {
      x: [-1.48, -1.27, -1.48, -1.69, -2.03, -2.37, -2.37, -2.37, -2.03, -1.69, -1.878],
      y: [-1.824, -1.824, -1.246, -0.667, -0.31, 0.04, -0.31, -0.667, -1.246, -1.824, -0.987],
      z: [-0.48, -1.128, -1.417, -1.706, -1.24, -0.78, -0.191, 0.387, 0.277, 0.166, -0.61],
    },
    Back: {
      x: [0, -0.68, -0.89, -1.1, -0.55, 0, 0.55, 1.1, 0.89, 0.68, 0],
      y: [-1.824, -1.824, -1.246, -0.667, -0.31, 0.04, -0.31, -0.667, -1.246, -1.824, -0.987],
      z: [-1.555, -1.555, -1.845, -2.134, -2.313, -2.49, -2.313, -2.134, -1.845, -1.555, -1.974],
    },
    BackRight: {
      x: [1.48, 1.69, 2.03, 2.37, 2.37, 2.37, 2.03, 1.69, 1.48, 1.269, 1.877],
      y: [-1.824, -1.824, -1.246, -0.667, -0.31, 0.04, -0.31, -0.667, -1.246, -1.824, -0.987],
      z: [-0.48, 0.166, 0.276, 0.387, -0.191, -0.77, -1.24, -1.7, -1.42, -1.128, -0.61],
    },
    UpLeft: {
      x: [-0.914, -1.464, -1.804, -2.144, -1.804, -1.464, -0.914, -0.364, -0.364, -0.364, -1.16],
      y: [1.824, 1.824, 1.246, 0.667, 0.31, -0.04, 0.31, 0.667, 1.246, 1.824, 0.987],
      z: [-1.26, -0.859, -0.97, -1.08, -1.548, -2.016, -2.195, -2.373, -2.016, -1.658, -1.597],
    },
    DownRight: {
      x: [0.914, 1.464, 1.804, 2.144, 1.804, 1.464, 0.914, 0.364, 0.364, 0.364, 1.16],
      y: [-1.824, -1.824, -1.246, -0.667, -0.31, 0.04, -0.31, -0.667, -1.246, -1.824, -0.987],
      z: [1.26, 0.859, 0.97, 1.08, 1.548, 2.016, 2.195, 2.373, 2.016, 1.658, 1.597],
    },
    UpRight: {
      x: [0.914, 0.364, 0.364, 0.364, 0.914, 1.465, 1.805, 2.145, 1.805, 1.465, 1.16],
      y: [1.824, 1.824, 1.246, 0.667, 0.31, -0.04, 0.31, 0.667, 1.246, 1.824, 0.987],
      z: [-1.259, -1.658, -2.016, -2.373, -2.195, -2.016, -1.548, -1.08, -0.97, -0.859, -1.597],
    },
    DownLeft: {
      x: [-0.914, -0.364, -0.364, -0.364, -0.914, -1.465, -1.805, -2.145, -1.805, -1.465, -1.16],
      y: [-1.824, -1.824, -1.246, -0.667, -0.31, 0.04, -0.31, -0.667, -1.246, -1.824, -0.987],
      z: [1.259, 1.658, 2.016, 2.373, 2.195, 2.016, 1.548, 1.08, 0.97, 0.859, 1.597],
    },
  };

  protected readonly movements: Record<
    TDodecahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Up: [
      ['DirectionP', 'Front'],
      ['DirectionC', 'Right'],
      ['DirectionL', 'UpRight'],
      ['DirectionM', 'UpLeft'],
      ['DirectionD', 'Left'],
    ],
    Down: [
      ['DirectionP', 'Back'],
      ['DirectionC', 'BackLeft'],
      ['DirectionL', 'DownLeft'],
      ['DirectionM', 'DownRight'],
      ['DirectionD', 'BackRight'],
    ],
    Right: [
      ['DirectionC', 'Up', true],
      ['DirectionE', 'Front'],
      ['DirectionH', 'DownRight'],
      ['DirectionB', 'BackRight'],
      ['DirectionK', 'UpRight', true],
    ],
    BackLeft: [
      ['DirectionC', 'Down', true],
      ['DirectionE', 'Back'],
      ['DirectionH', 'UpLeft'],
      ['DirectionB', 'Left'],
      ['DirectionK', 'DownLeft', true],
    ],
    Front: [
      ['DirectionP', 'Up', true],
      ['DirectionF', 'Left'],
      ['DirectionN', 'DownLeft'],
      ['DirectionO', 'DownRight'],
      ['DirectionG', 'Right'],
    ],
    Back: [
      ['DirectionP', 'Down', true],
      ['DirectionE', 'BackLeft', true],
      ['DirectionO', 'UpLeft'],
      ['DirectionN', 'UpRight'],
      ['DirectionF', 'BackRight'],
    ],
    Left: [
      ['DirectionD', 'Up', true],
      ['DirectionJ', 'UpLeft'],
      ['DirectionB', 'BackLeft', true],
      ['DirectionI', 'DownLeft'],
      ['DirectionF', 'Front', true],
    ],
    BackRight: [
      ['DirectionD', 'Down', true],
      ['DirectionJ', 'DownRight'],
      ['DirectionB', 'Right', true],
      ['DirectionI', 'UpRight'],
      ['DirectionF', 'Back', true],
    ],
    UpLeft: [
      ['DirectionM', 'Up', true],
      ['DirectionJ', 'Left', true],
      ['DirectionH', 'BackLeft', true],
      ['DirectionO', 'Back', true],
      ['DirectionA', 'UpRight'],
    ],
    DownRight: [
      ['DirectionM', 'Down', true],
      ['DirectionJ', 'BackRight', true],
      ['DirectionH', 'Right', true],
      ['DirectionO', 'Front', true],
      ['DirectionA', 'DownLeft'],
    ],
    UpRight: [
      ['DirectionL', 'Up', true],
      ['DirectionA', 'UpLeft', true],
      ['DirectionN', 'Back', true],
      ['DirectionI', 'BackRight', true],
      ['DirectionK', 'Right'],
    ],
    DownLeft: [
      ['DirectionL', 'Down', true],
      ['DirectionA', 'DownRight', true],
      ['DirectionN', 'Front', true],
      ['DirectionI', 'Left', true],
      ['DirectionK', 'BackLeft'],
    ],
  };

  protected createPiecesData(): Array<
    TShellPieceData<
      TDodecahedronRotationGroups,
      TDodecahedronRotationTypes,
      TDodecahedronShellFilenames
    >
  > {
    const piecesData: Array<
      TShellPieceData<
        TDodecahedronRotationGroups,
        TDodecahedronRotationTypes,
        TDodecahedronShellFilenames
      >
    > = [];

    for (const face in this.facePieceInitialPositions) {
      const facePieceInitialPositions = this.facePieceInitialPositions[face as TDodecahedronFaces];
      const facePieceInitialRotations = this.facePieceInitialRotations[face as TDodecahedronFaces];
      const facePieceIdxs = this.pieceFilnemesIdxs[face as TDodecahedronFaces];
      const movements = this.movements[face as TDodecahedronFaces];

      for (let i = 0; i < facePieceInitialPositions.x.length; i++) {
        const initPosition = new THREE.Vector3(
          facePieceInitialPositions.x[i],
          facePieceInitialPositions.y[i],
          facePieceInitialPositions.z[i],
        );
        const initRotation = new THREE.Euler(
          facePieceInitialRotations.x[i],
          facePieceInitialRotations.y[i],
          facePieceInitialRotations.z[i],
        );
        piecesData.push({
          filename: this.piecesFilenames[facePieceIdxs[i]],
          rotations: this.createPieceRotationData(
            i % 2 === 0
              ? i === 10
                ? []
                : [movements[i / 2]]
              : [movements[(i - 1) / 2], movements[((i + 1) / 2) % movements.length]],
          ),
          initRotation: {
            rotation: initRotation,
            axes: this.axes[face as TDodecahedronFaces],
          },
          initPosition,
        });
      }
    }

    return piecesData;
  }

  public readonly piecesData: Array<
    TShellPieceData<
      TDodecahedronRotationGroups,
      TDodecahedronRotationTypes,
      TDodecahedronShellFilenames
    >
  > = this.createPiecesData();

  public readonly isRotateOnWorldAxis: boolean = true;
}

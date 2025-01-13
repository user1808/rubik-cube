import { Vector3, Euler } from 'three';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellDirections,
  TTetrahedronShellFilenames,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { AbstractRubikCubeShellData } from '../shell-data';
import { Radians } from '@/utils/radians';

type TTetrahedronShellPositionValues = Record<'x' | 'y' | 'z', Array<number>>;

export class RubikTetrahedronShellData extends AbstractRubikCubeShellData<
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilenames,
  TTetrahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected readonly ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected readonly invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected readonly directions: Record<TTetrahedronShellDirections, Vector3> = {
    DirectionA: new Vector3(-0.3, -0.82, 0.5),
    DirectionB: new Vector3(-0.57, 0.82, 0),
    DirectionC: new Vector3(-0.87, 0, 0.5),
    DirectionD: new Vector3(0.3, 0.82, 0.5),
    DirectionE: new Vector3(0.87, 0, 0.5),
    DirectionF: new Vector3(0, 0, -1),
  };
  public readonly piecesFilenames: Array<TTetrahedronShellFilenames> = ['TetrahedronShellPart.glb'];

  protected readonly movements: Record<
    TTetrahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  > = {
    Front: [
      ['DirectionA', 'Left'],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpCorner'],
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'UpMidLayer'],
      ['DirectionA', 'Left'],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpMidLayer'],
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'UpMidLayer'],
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftCorner', true],
      ['DirectionC', 'Down', true],
      ['DirectionA', 'Left'],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'Down', true],
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'LeftMidLayer', true],
      ['DirectionC', 'Down', true],
      ['DirectionA', 'RightMidLayer', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'Down', true],
      ['DirectionA', 'RightCorner', true],
      ['DirectionB', 'Right'],
      ['DirectionC', 'Down', true],
    ],
    Right: [
      ['DirectionB', 'Front', true],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpCorner'],
      ['DirectionB', 'Front', true],
      ['DirectionD', 'RightMidLayer', true],
      ['DirectionE', 'UpMidLayer'],
      ['DirectionB', 'Front', true],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpMidLayer'],
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'UpMidLayer'],
      ['DirectionB', 'Front', true],
      ['DirectionD', 'RightCorner', true],
      ['DirectionE', 'Down', true],
      ['DirectionB', 'Front', true],
      ['DirectionD', 'RightMidLayer', true],
      ['DirectionE', 'Down', true],
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'RightMidLayer', true],
      ['DirectionE', 'Down', true],
      ['DirectionB', 'BackMidLayer'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'Down', true],
      ['DirectionB', 'BackCorner'],
      ['DirectionD', 'Left'],
      ['DirectionE', 'Down', true],
    ],
    Left: [
      ['DirectionD', 'Right', true],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpCorner'],
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'UpMidLayer'],
      ['DirectionD', 'Right', true],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpMidLayer'],
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'UpMidLayer'],
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackCorner'],
      ['DirectionF', 'Down', true],
      ['DirectionD', 'Right', true],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'Down', true],
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'BackMidLayer'],
      ['DirectionF', 'Down', true],
      ['DirectionD', 'LeftMidLayer'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'Down', true],
      ['DirectionD', 'LeftCorner'],
      ['DirectionA', 'Front', true],
      ['DirectionF', 'Down', true],
    ],
    Down: [
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightCorner', true],
      ['DirectionC', 'Front'],
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'Front'],
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'Front'],
      ['DirectionE', 'Right'],
      ['DirectionF', 'RightMidLayer', true],
      ['DirectionC', 'BackMidLayer', true],
      ['DirectionE', 'LeftCorner', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'Front'],
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'Front'],
      ['DirectionE', 'LeftMidLayer', true],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackMidLayer', true],
      ['DirectionE', 'Right'],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackMidLayer', true],
      ['DirectionE', 'Right'],
      ['DirectionF', 'Left'],
      ['DirectionC', 'BackCorner', true],
    ],
  };
  protected readonly facePieceInitialRotations: Record<TTetrahedronFaces, Array<Euler>> = {
    Down: [new Euler(0, 0, 0), new Euler(0, Radians['180deg'], 0)],
    Left: [
      new Euler(0, Radians['180deg'], -Radians.angleToRadians(109.47)),
      new Euler(0, 0, Radians.angleToRadians(109.47)),
    ],
    Front: [
      new Euler(0, -Radians['60deg'], -Radians.angleToRadians(109.47)),
      new Euler(0, Radians['120deg'], Radians.angleToRadians(109.47)),
    ],
    Right: [
      new Euler(0, Radians['60deg'], -Radians.angleToRadians(109.47)),
      new Euler(0, -Radians['120deg'], Radians.angleToRadians(109.47)),
    ],
  };
  protected readonly facePieceInitialPositions: Record<
    TTetrahedronFaces,
    TTetrahedronShellPositionValues
  > = {
    Down: {
      x: [1.892, 0.473, 0.952, 0.473, -0.952, -0.473, -0.952, -0.473, -0.952],
      y: [-1.0101, -1.0101, -1.0101, -1.0101, -1.0101, -1.0101, -1.0101, -1.0101, -1.0101],
      z: [0, 0.82, 0, -0.82, 1.64, 0.82, 0, -0.82, -1.64],
    },
    Left: {
      x: [-0.317, -0.793, -0.635, -0.793, -1.27, -1.111, -1.27, -1.111, -1.27],
      y: [2.13, 0.786, 1.234, 0.786, -0.56, -0.112, -0.56, -0.112, -0.56],
      z: [0, -0.82, 0, 0.82, -1.64, -0.82, 0, 0.82, 1.64],
    },
    Front: {
      x: [0.159, -0.317, 0.317, 1.111, -0.793, -0.159, 0.635, 1.27, 2.06],
      y: [2.13, 0.786, 1.234, 0.786, -0.56, -0.112, -0.56, -0.112, -0.56],
      z: [0.275, 1.1, 0.55, 0.275, 1.925, 1.375, 1.1, 0.55, 0.275],
    },
    Right: {
      x: [0.159, 1.111, 0.317, -0.317, 2.06, 1.27, 0.635, -0.159, -0.793],
      y: [2.13, 0.786, 1.234, 0.786, -0.56, -0.112, -0.56, -0.112, -0.56],
      z: [-0.275, -0.275, -0.55, -1.1, -0.275, -0.55, -1.1, -1.375, -1.925],
    },
  };

  protected createPiecesData(): Array<
    TShellPieceData<
      TTetrahedronRotationGroups,
      TTetrahedronRotationTypes,
      TTetrahedronShellFilenames
    >
  > {
    const piecesData: Array<
      TShellPieceData<
        TTetrahedronRotationGroups,
        TTetrahedronRotationTypes,
        TTetrahedronShellFilenames
      >
    > = [];

    for (const face in this.facePieceInitialPositions) {
      const facePieceInitialPositions = this.facePieceInitialPositions[face as TTetrahedronFaces];
      const facePieceInitialRotations = this.facePieceInitialRotations[face as TTetrahedronFaces];
      const movements = this.movements[face as TTetrahedronFaces];

      for (let i = 0; i < facePieceInitialPositions.x.length; i++) {
        const initPosition = new Vector3(
          facePieceInitialPositions.x[i],
          facePieceInitialPositions.y[i],
          facePieceInitialPositions.z[i],
        );
        const initRotation = (
          [2, 5, 7].includes(i) ? facePieceInitialRotations[1] : facePieceInitialRotations[0]
        ).clone();
        piecesData.push({
          filename: 'TetrahedronShellPart.glb',
          rotations: this.createPieceRotationData([
            movements[i * 3],
            movements[i * 3 + 1],
            movements[i * 3 + 2],
          ]),
          initRotation: { rotation: initRotation },
          initPosition,
        });
      }
    }

    return piecesData;
  }

  public readonly piecesData: Array<
    TShellPieceData<
      TTetrahedronRotationGroups,
      TTetrahedronRotationTypes,
      TTetrahedronShellFilenames
    >
  > = this.createPiecesData();
  public readonly isRotateOnWorldAxis: boolean = false;
}

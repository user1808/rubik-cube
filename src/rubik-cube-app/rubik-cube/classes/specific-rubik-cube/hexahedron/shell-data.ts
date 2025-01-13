import { Vector3, Euler } from 'three';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronShellDirections } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-directions';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import { AbstractRubikCubeShellData } from '../shell-data';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { Radians } from '@/utils/radians';

export type THexahedronShellPositionValues = Record<'x' | 'y' | 'z', Array<number>>;

export abstract class AbstractRubikHexahedronShellData<
  TCubeRotationGroups extends string,
> extends AbstractRubikCubeShellData<
  TCubeRotationGroups,
  THexahedronRotationTypes,
  THexahedronShellFilenames,
  THexahedronShellDirections,
  'Clockwise',
  'CounterClockwise'
> {
  protected override ordinaryRotationName: 'Clockwise' = 'Clockwise';
  protected override invertedRotationName: 'CounterClockwise' = 'CounterClockwise';
  protected override directions: Record<THexahedronShellDirections, Vector3> = {
    X: new Vector3(1, 0, 0),
    Y: new Vector3(0, 1, 0),
    Z: new Vector3(0, 0, 1),
  };
  public override piecesFilenames: Array<THexahedronShellFilenames> = ['HexahedronShellPart.glb'];

  public override readonly isRotateOnWorldAxis = false;

  protected abstract readonly horizontalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  >;
  protected abstract readonly verticalMovements: Record<
    THexahedronFaces,
    ArgumentTypes<typeof this.createPieceRotationData>[0]
  >;
  protected readonly facePieceInitialRotations: Record<THexahedronFaces, Euler> = {
    Front: new Euler(Radians['90deg'], 0, 0),
    Back: new Euler(-Radians['90deg'], 0, 0),
    Right: new Euler(0, 0, Radians['90deg']),
    Left: new Euler(0, 0, -Radians['90deg']),
    Up: new Euler(0, 0, 0),
    Down: new Euler(Radians['180deg'], 0, 0),
  };
  protected abstract readonly facePieceInitialPositions: Record<
    THexahedronFaces,
    THexahedronShellPositionValues
  >;

  protected createPiecesData(): Array<
    TShellPieceData<TCubeRotationGroups, THexahedronRotationTypes, THexahedronShellFilenames>
  > {
    const piecesData: Array<
      TShellPieceData<TCubeRotationGroups, THexahedronRotationTypes, THexahedronShellFilenames>
    > = [];

    for (const face in this.facePieceInitialPositions) {
      const facePieceInitialPositions = this.facePieceInitialPositions[face as THexahedronFaces];
      const facePieceInitialRotations = this.facePieceInitialRotations[face as THexahedronFaces];
      const horizontalMovements = this.horizontalMovements[face as THexahedronFaces];
      const verticalMovements = this.verticalMovements[face as THexahedronFaces];

      for (let i = 0; i < facePieceInitialPositions.x.length; i++) {
        for (let j = 0; j < facePieceInitialPositions.y.length; j++) {
          for (let k = 0; k < facePieceInitialPositions.z.length; k++) {
            const initPosition = new Vector3(
              facePieceInitialPositions.x[i],
              facePieceInitialPositions.y[j],
              facePieceInitialPositions.z[k],
            );
            const initRotation = facePieceInitialRotations.clone();
            const pieceHorizontalMovements =
              horizontalMovements[facePieceInitialPositions.y.length > 1 ? j : k];
            const pieceVerticalMovements =
              verticalMovements[facePieceInitialPositions.x.length > 1 ? i : k];
            piecesData.push({
              filename: 'HexahedronShellPart.glb',
              rotations:
                pieceHorizontalMovements && pieceVerticalMovements
                  ? this.createPieceRotationData([pieceHorizontalMovements, pieceVerticalMovements])
                  : [],
              initRotation: { rotation: initRotation },
              initPosition,
            });
          }
        }
      }
    }

    return piecesData;
  }
}

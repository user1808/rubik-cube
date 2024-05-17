import type { IRubikCubeBuilder } from '../../interfaces/rubik-cube-builder';
import type { IRubikCubePiecesData } from '../../interfaces/rubik-cube-pieces-data';
import type { IRubikCubeRotationData } from '../../interfaces/rubik-cube-rotation-data';
import type { IRubikCubeRotationImplementation } from '../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCube } from '../../interfaces/structure/rubik-cube';
import type { IRubikCubePieceWrapper } from '../../interfaces/structure/rubik-cube-piece-wrapper';
import { RubikCube } from './structure/cube/rubik-cube';

export class RubikCubeBuilder<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> implements
    IRubikCubeBuilder<
      TPiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TPiecesFilenames
    >
{
  public createCube(
    pieces: Array<IRubikCubePieceWrapper>,
    piecesData: IRubikCubePiecesData<TPiecesFilenamesWithFaces, TCubeFaces, TCubeRotationGroups>,
    rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    rotationImplementation: IRubikCubeRotationImplementation,
  ): IRubikCube<TCubeRotationGroups, TCubeRotationTypes> {
    const cubeRotationGroups = this.createRotationGroups(
      pieces,
      piecesData.piecesIdxsForRotationGroups,
    );
    const newRubikCube = new RubikCube(
      pieces,
      cubeRotationGroups,
      rotationData,
      rotationImplementation,
    );
    return newRubikCube;
  }

  private createRotationGroups(
    pieces: Array<IRubikCubePieceWrapper>,
    piecesIdxsForRotationGroups: Record<TCubeRotationGroups, Array<ArrayIdx>>,
  ): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>> {
    const result = (<Array<TCubeRotationGroups>>Object.keys(piecesIdxsForRotationGroups)).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: piecesIdxsForRotationGroups[cur].map((idx) => pieces[idx]),
      }),
      {} as Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>,
    );

    return result;
  }
}

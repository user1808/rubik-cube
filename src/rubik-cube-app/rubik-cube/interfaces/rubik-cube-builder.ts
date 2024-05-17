import type { IRubikCubePiecesData } from './rubik-cube-pieces-data';
import type { IRubikCubeRotationData } from './rubik-cube-rotation-data';
import type { IRubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCube } from './structure/rubik-cube';
import type { IRubikCubePieceWrapper } from './structure/rubik-cube-piece-wrapper';

export interface IRubikCubeBuilder<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> {
  createCube(
    pieces: Array<IRubikCubePieceWrapper>,
    piecesData: IRubikCubePiecesData<TPiecesFilenamesWithFaces, TCubeFaces, TCubeRotationGroups>,
    rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    rotationImplementation: IRubikCubeRotationImplementation,
  ): IRubikCube<TCubeRotationGroups, TCubeRotationTypes>;
}

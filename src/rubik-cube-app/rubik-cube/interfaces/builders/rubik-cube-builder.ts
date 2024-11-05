import type { IRubikCube } from '../structure';

export interface IRubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  buildCube(): Promise<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
}

import type { TPieceData } from '../types/rubik-cube/piece-data';

/**
 * Represents the data of the Rubik's Cube pieces.
 *
 * @template TPiecesFilenamesWithFaces The type of the pieces filenames with their faces. It is a record where the keys are the filenames of the pieces and the values are the faces of the pieces.
 * @example
 * type TSomeCubePiecesWithFaces = {
 *  'SomeCubePiece1.glb': 'FaceA' | 'FaceB' | 'FaceC' | 'FaceD' | 'FaceE' | 'FaceF';
 *  'SomeCubePiece2.glb': 'FaceA' | 'FaceB' | 'FaceC' | 'FaceD';
 *  ...
 * };
 *
 * @template TCubeFaces The type of the faces of the cube.
 * @example
 * type TSomeCubeFaces = 'Top' | 'Bottom' | 'Front' | 'Back' | 'Left' | 'Right';
 *
 * @template TPiecesFilenames The type of the filenames of the pieces. It is the keys of the record TPiecesFilenamesWithFaces. You should not set this type manually.
 * @example
 * type TSomeCubePiecesFilenames = ExtractStringKeys<TSomeCubePiecesWithFaces> = 'SomeCubePiece1.glb' | 'SomeCubePiece2.glb' | ...
 *
 * @template TPiecesFaces The type of the faces of the pieces. It is the values of the record TPiecesFilenamesWithFaces. You should not set this type manually.
 * @example
 * type TSomeCubePiecesFaces = TSomeCubePiecesWithFaces[TSomeCubePiecesFilenames] = 'FaceA' | 'FaceB' | 'FaceC' | 'FaceD' | 'FaceE' | 'FaceF';
 *
 */
export interface IRubikCubePiecesData<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeRotationGroups extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> {
  /**
   * The filenames of the pieces.
   */
  get piecesFilenames(): Array<TPiecesFilenames>;
  /**
   * The data of the pieces. More info in the {@link TPieceData} type.
   */
  get piecesData(): Array<TPieceData<TPiecesFilenamesWithFaces, TCubeFaces>>;
  get piecesIdxsForRotationGroups(): Record<TCubeRotationGroups, Array<ArrayIdx>>;
}

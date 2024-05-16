import * as THREE from 'three';

/**
 * The type of the data of a piece of the Rubik's Cube. It may not look really friendly,
 * but because of using mapped types, by specifying the filename field, TypeScript helps you to set the correct values for the pieceFacesToCubeFaces field.
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
 * @template TPiecesFilenames The type of the filenames of the pieces. It is the keys of the record TPiecesWithFaces. You should not set this type manually.
 * @example
 * type TSomeCubePiecesFilenames = ExtractStringKeys<TSomeCubePiecesWithFaces> = 'SomeCubePiece1.glb' | 'SomeCubePiece2.glb' | ...
 *
 * @template TPiecesFaces The type of the faces of the pieces. It is the values of the record TPiecesWithFaces. You should not set this type manually.
 * @example
 * type TSomeCubePiecesFaces = TSomeCubePiecesWithFaces[TSomeCubePiecesFilenames] = 'FaceA' | 'FaceB' | 'FaceC' | 'FaceD' | 'FaceE' | 'FaceF';
 *
 */

export type TPieceData<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> = {
  /**
   * Represents a piece of the Rubik's Cube.
   */
  [TPieceFilename in TPiecesFilenames]: {
    /**
     * The unique identifier of the piece.
     */
    id: number;
    /**
     * The position of the piece in 3D space.
     */
    position: THREE.Vector3;
    /**
     * The rotation of the piece.
     */
    rotation: THREE.Euler;
    /**
     * The filename of the piece.
     */
    filename: TPieceFilename;
    /**
     * A mapping of the piece's faces to the faces of the cube. Partial because not all faces of the piece are visible.
     */
    pieceFacesToCubeFaces: Partial<Record<TPiecesFilenamesWithFaces[TPieceFilename], TCubeFaces>>;
  };
}[TPiecesFilenames];

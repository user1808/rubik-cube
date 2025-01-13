import type { BufferGeometry, Euler, Group, Object3D } from 'three';
import { Vector3, Mesh, MeshBasicMaterial } from 'three';
import type {
  TCubeFaceColor,
  TCubeFaceMaterial,
  TPieceData,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TypeGuards } from '@/utils/type-guards';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikCubePiece } from '../structure/piece/rubik-cube-piece';
import { RubikCubePieceFace } from '../structure/piece/rubik-cube-piece-face';
import { RubikCubePieceVisibleFace } from '../structure/piece/rubik-cube-piece-visible-face';

type TTransformGLTFPieceFacesReturn<TCubeFacesNames extends string> = {
  allFaces: Array<RubikCubePieceFace>;
  visibleFaces: Array<RubikCubePieceVisibleFace<TCubeFacesNames>>;
};

/**
 * The Rubik's Cube Piece Builder class. It is responsible for creating the Rubik's Cube pieces. It is universal to any Rubik's Cube that I made so far.
 */
export class RubikCubePieceBuilder<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> implements
    IRubikCubePieceBuilder<
      TPiecesFilenamesWithFaces,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TPiecesFilenames
    >
{
  public buildPiece(
    loadedGLTFPieces: Map<TPiecesFilenames, GLTF>,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFacesNames, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
    cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>,
  ): RubikCubePiece<TCubeFacesNames> {
    const { id, position, rotation, filename } = pieceData;

    const gltfPiece = loadedGLTFPieces.get(filename)?.scene;
    if (!gltfPiece) throw new Error(`${filename} piece was not found`);

    const initCubeFacesColors = Object.assign({}, materials.initCubeFacesColors);

    const pieceFaces = this.transformGLTFPieceFaces(
      gltfPiece,
      pieceData,
      materials,
      cubeFacesNormalVectors,
      initCubeFacesColors,
    );
    const newPiece = new RubikCubePiece(
      id,
      pieceFaces.allFaces,
      pieceFaces.visibleFaces,
      initCubeFacesColors,
    );

    this.setPieceInWorld(newPiece, position, rotation);

    return newPiece;
  }

  /**
   * This method should transform the GLTF piece into a RubikCubePieceFaces array.
   * @param gltfPiece The loaded GLTF piece.
   * @param pieceData The data of the piece.
   * @param materials The materials of the Rubik's Cube.
   * @returns The transformed piece faces.
   */
  private transformGLTFPieceFaces(
    gltfPiece: Group,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFacesNames, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
    cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>,
    initCubeFacesColors: Record<TCubeFacesNames, Nullable<TCubeFaceColor>>,
  ): TTransformGLTFPieceFacesReturn<TCubeFacesNames> {
    const allFaces: Array<RubikCubePieceFace> = [];
    const visibleFaces: Array<RubikCubePieceVisibleFace<TCubeFacesNames>> = [];

    gltfPiece.children.forEach((pieceFace) => {
      const piece = this.createPieceFace(
        pieceFace,
        pieceData,
        materials,
        cubeFacesNormalVectors,
        initCubeFacesColors,
      );
      allFaces.push(piece);

      if (piece instanceof RubikCubePieceVisibleFace) {
        visibleFaces.push(piece);
      }
    });

    return { allFaces, visibleFaces };
  }

  /**
   * This method should create a piece face from the loaded GLTF piece face.
   * @param pieceFace The loaded GLTF piece face.
   * @param pieceData The data of the piece.
   * @param materials The materials of the Rubik's Cube.
   * @returns The created piece face.
   */
  private createPieceFace(
    pieceFace: Object3D,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFacesNames, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
    cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>,
    pieceCubeFacesColors: Record<TCubeFacesNames, Nullable<TCubeFaceColor>>,
  ): RubikCubePieceFace | RubikCubePieceVisibleFace<TCubeFacesNames> {
    if (!TypeGuards.isT(pieceFace, Mesh))
      throw new Error('Loaded Piece Face is not a three.js Mesh');

    const geometry: BufferGeometry = pieceFace.geometry;
    const material: TCubeFaceMaterial | MeshBasicMaterial = this.chooseRightMaterial(
      pieceFace.name,
      pieceData,
      materials,
    );

    return material instanceof MeshBasicMaterial
      ? new RubikCubePieceFace({ geometry, material })
      : new RubikCubePieceVisibleFace({
          geometry,
          material: material.material,
          color: material.color,
          cubeFacesNormalVectors,
          pieceCubeFacesColors,
        });
  }

  /**
   * This method should choose the right material for the piece face. The material is chosen based on the piece face name and the materials of the Rubik's Cube.
   * @param pieceFaceName The name of the piece face.
   * @param pieceData The data of the piece.
   * @param materials The materials of the Rubik's Cube.
   * @returns The chosen material.
   */
  private chooseRightMaterial(
    pieceFaceName: string,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFacesNames, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
  ): TCubeFaceMaterial | MeshBasicMaterial {
    const { pieceFacesToCubeFaces } = pieceData;
    let material: TCubeFaceMaterial | MeshBasicMaterial = materials.cubeInvisibleFacesMaterials;

    if (TypeGuards.isObjectKey(pieceFaceName, pieceFacesToCubeFaces)) {
      const cubeFace = pieceFacesToCubeFaces[pieceFaceName];
      material = cubeFace ? materials.cubeFacesMaterials[cubeFace] : material;
    }
    if (TypeGuards.isObjectKey(pieceFaceName, materials.cubeEdgeFacesMaterials)) {
      material = materials.cubeEdgeFacesMaterials[pieceFaceName];
    }

    return material;
  }

  /**
   * This method should set the piece in the world.
   */
  private setPieceInWorld(
    piece: RubikCubePiece<TCubeFacesNames>,
    position: Vector3,
    rotation: Euler,
  ) {
    this.setPosition(piece, position);
    this.setRotation(piece, rotation);
  }

  private setPosition(newPiece: RubikCubePiece<TCubeFacesNames>, { x, y, z }: Vector3) {
    newPiece.position.set(x, y, z);
  }

  /**
   * This method should set the rotation of the piece. The rotation is made like this because in Blender the rotation is made some kind of different, so we need to rotate the piece in the world axis.
   */
  private setRotation(newPiece: RubikCubePiece<TCubeFacesNames>, euler: Euler) {
    newPiece.rotateOnWorldAxis(new Vector3(1, 0, 0), euler.x);
    newPiece.rotateOnWorldAxis(new Vector3(0, 0, -1), euler.z);
    newPiece.rotateOnWorldAxis(new Vector3(0, 1, 0), euler.y);
    newPiece.pieceVisibleFaces.forEach((face) => face.applyQuaternionToNormal(newPiece.quaternion));
  }
}

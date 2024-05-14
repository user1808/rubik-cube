import * as THREE from 'three';
import { RubikCubePiece } from './structure/piece/rubik-cube-piece';
import { RubikCubePieceFace } from './structure/piece/rubik-cube-piece-face';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { TypeGuards } from '@/utils/type-guards';

/**
 * The Rubik's Cube Piece Builder class. It is responsible for creating the Rubik's Cube pieces. It is universal to any Rubik's Cube that I made so far.
 */
export class RubikCubePieceBuilder<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> implements
    IRubikCubePieceBuilder<TPiecesFilenamesWithFaces, TCubeFaces, TCubeEdgeFaces, TPiecesFilenames>
{
  public createPiece(
    loadedGltfPieces: Map<TPiecesFilenames, GLTF>,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFaces, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): RubikCubePiece {
    const { id, position, rotation, filename } = pieceData;

    const gltfPiece = loadedGltfPieces.get(filename)?.scene;
    if (!gltfPiece) throw new Error(`${filename} piece was not found`);

    const pieceFaces = this.transformGLTFPieceFaces(gltfPiece, pieceData, materials);
    const newPiece = new RubikCubePiece(id, pieceFaces);

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
    gltfPiece: THREE.Group,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFaces, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): Array<RubikCubePieceFace> {
    return gltfPiece.children.map((pieceFace) =>
      this.createPieceCallback(pieceFace, pieceData, materials),
    );
  }

  /**
   * This method should create a piece face from the loaded GLTF piece face.
   * @param pieceFace The loaded GLTF piece face.
   * @param pieceData The data of the piece.
   * @param materials The materials of the Rubik's Cube.
   * @returns The created piece face.
   */
  private createPieceCallback(
    pieceFace: THREE.Object3D,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFaces, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): RubikCubePieceFace {
    if (!TypeGuards.isT(pieceFace, THREE.Mesh))
      throw new Error('Loaded Piece Face is not a three.js Mesh');

    const geometry: THREE.BufferGeometry = pieceFace.geometry;
    const material = this.chooseRightMaterial(pieceFace.name, pieceData, materials);

    return new RubikCubePieceFace({ geometry, material });
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
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFaces, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): THREE.MeshBasicMaterial {
    const { pieceFacesToCubeFaces } = pieceData;
    let material: THREE.MeshBasicMaterial = materials.cubeInvisibleFacesMaterials;

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
  private setPieceInWorld(piece: RubikCubePiece, position: THREE.Vector3, rotation: THREE.Euler) {
    this.setPosition(piece, position);
    this.setRotation(piece, rotation);
  }

  private setPosition(newPiece: RubikCubePiece, { x, y, z }: THREE.Vector3) {
    newPiece.position.set(x, y, z);
  }

  /**
   * This method should set the rotation of the piece. The rotation is made like this because in Blender the rotation is made some kind of different, so we need to rotate the piece in the world axis.
   */
  private setRotation(newPiece: RubikCubePiece, { x, y, z }: THREE.Euler) {
    newPiece.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), x);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 0, -1), z);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), y);
  }
}

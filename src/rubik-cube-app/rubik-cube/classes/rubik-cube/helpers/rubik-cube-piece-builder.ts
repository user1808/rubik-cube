import * as THREE from 'three';
import { RubikCubePiece } from '../structure/piece/rubik-cube-piece';
import { RubikCubePieceFace } from '../structure/piece/rubik-cube-piece-face';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isT } from '@/utils/is-t';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { isObjectKey } from '@/utils/is-object-key';

export class RubikCubePieceBuilder<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TPiecesFilenames extends Extract<keyof TPiecesWithFaces, string> = Extract<
    keyof TPiecesWithFaces,
    string
  >,
  TPiecesFaces extends string = TPiecesWithFaces[TPiecesFilenames],
> implements IRubikCubePieceBuilder<TPiecesWithFaces, TCubeFaces, TPiecesFilenames, TPiecesFaces>
{
  private edgeFaceMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0x525252,
  });

  public createPiece(
    pieceData: TPieceData<TPiecesWithFaces, TCubeFaces, TPiecesFilenames, TPiecesFaces>,
    loadedGltfPieces: Map<Extract<keyof TPiecesWithFaces, string>, GLTF>,
    materials: IRubikCubeMaterials<TCubeFaces>,
  ): RubikCubePiece {
    const { id, position, rotation, filename, pieceFacesToCubeFaces } = pieceData;

    const gltfPiece = loadedGltfPieces.get(filename)?.scene;
    if (!gltfPiece) throw new Error(`${filename} piece was not found`);

    const newPiece = new RubikCubePiece(
      id,
      this.transformGLTFPieceFaces(gltfPiece, pieceFacesToCubeFaces, materials),
    );

    newPiece.position.set(position.x, position.y, position.z);
    this.setRotation(newPiece, rotation);

    return newPiece;
  }

  private transformGLTFPieceFaces(
    gltfPiece: THREE.Group,
    pieceFacesToCubeFaces: Partial<Record<TPiecesWithFaces[TPiecesFilenames], TCubeFaces>>,
    materials: IRubikCubeMaterials<TCubeFaces>,
  ): Array<RubikCubePieceFace> {
    return gltfPiece.children.map((pieceFace) =>
      this.createPieceCallback(pieceFace, pieceFacesToCubeFaces, materials),
    );
  }

  private createPieceCallback(
    pieceFace: THREE.Object3D,
    pieceFacesToCubeFaces: Partial<Record<TPiecesWithFaces[TPiecesFilenames], TCubeFaces>>,
    materials: IRubikCubeMaterials<TCubeFaces>,
  ): RubikCubePieceFace {
    if (isT(pieceFace, THREE.Mesh) == false)
      throw new Error('Loaded Piece Face is not a three.js Mesh');

    let material = this.edgeFaceMaterial;
    const pieceFaceName = pieceFace.name;
    if (isObjectKey(pieceFaceName, pieceFacesToCubeFaces)) {
      const cubeFace = pieceFacesToCubeFaces[pieceFaceName];
      material = cubeFace ? materials.cubeFacesMaterials[cubeFace] : this.edgeFaceMaterial;
    }

    return new RubikCubePieceFace({
      geometry: pieceFace.geometry,
      material,
    });
  }

  private setRotation(newPiece: RubikCubePiece, { x, y, z }: THREE.Euler) {
    newPiece.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), x);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 0, -1), z);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), y);
  }
}

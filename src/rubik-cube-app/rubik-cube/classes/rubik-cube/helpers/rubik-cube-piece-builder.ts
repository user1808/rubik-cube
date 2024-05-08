import * as THREE from 'three';
import { RubikCubePiece } from '../structure/piece/rubik-cube-piece';
import { RubikCubePieceFace } from '../structure/piece/rubik-cube-piece-face';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isT } from '@/utils/is-t';

export class RubikCubePieceBuilder<TPiecesFilenames extends string>
  implements IRubikCubePieceBuilder<TPiecesFilenames>
{
  private primaryMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  private edgeFaceMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0x525252,
  });

  public createPiece(
    pieceData: TPieceData<TPiecesFilenames>,
    loadedGltfPieces: Map<TPiecesFilenames, GLTF>,
  ): RubikCubePiece {
    const { id, position, rotation, filename } = pieceData;

    const gltfPiece = loadedGltfPieces.get(filename)?.scene;
    if (!gltfPiece) throw new Error(`${filename} piece was not found`);

    const newPiece = new RubikCubePiece(id, this.transformGLTFPieceFaces(gltfPiece));

    newPiece.position.set(position.x, position.y, position.z);
    this.setRotation(newPiece, rotation);

    return newPiece;
  }

  private transformGLTFPieceFaces(gltfPiece: THREE.Group): Array<RubikCubePieceFace> {
    return gltfPiece.children.map((pieceFace) => this.createPieceCallback(pieceFace));
  }

  private createPieceCallback(pieceFace: THREE.Object3D): RubikCubePieceFace {
    if (isT(pieceFace, THREE.Mesh) == false)
      throw new Error('Loaded Piece Face is not a three.js Mesh');
    return new RubikCubePieceFace({
      geometry: pieceFace.geometry,
      material: pieceFace.name == 'EdgeFace' ? this.edgeFaceMaterial : this.primaryMaterial,
    });
  }

  private setRotation(newPiece: RubikCubePiece, { x, y, z }: THREE.Euler) {
    newPiece.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), x);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 0, -1), z);
    newPiece.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), y);
  }
}

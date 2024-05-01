import * as THREE from 'three';
import { RubikCubePiece } from '../../structure/piece/rubik-cube-piece';
import { RubikCubePieceFace } from '../../structure/piece/rubik-cube-piece-face';

export class RubikCubePieceBuilder {
  public createPiece(gltfPiece: THREE.Group): RubikCubePiece {
    const gltfPieceClone = gltfPiece.clone();
    return new RubikCubePiece(this._transformGLTFPieceFaces(gltfPieceClone));
  }

  private _transformGLTFPieceFaces(gltfPiece: THREE.Group): Array<RubikCubePieceFace> {
    return gltfPiece.children.map(this._createPieceCallback);
  }

  private _createPieceCallback = (pieceFace: THREE.Object3D): RubikCubePieceFace => {
    return new RubikCubePieceFace({
      geometry: (pieceFace as THREE.Mesh).geometry,
      material: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    });
  };
}

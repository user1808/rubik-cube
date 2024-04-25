import * as THREE from 'three';
import { RubikCubePiece } from '../RubikCubeStructure/RubikCubePiece/RubikCubePiece';
import { RubikCubePieceFace } from '../RubikCubeStructure/RubikCubePiece/RubikCubePieceFace';

export class RubikCubePieceBuilder {
  public createPiece(gltfPiece: THREE.Group): RubikCubePiece {
    return new RubikCubePiece(this._transformGLTFPieceFaces(gltfPiece));
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

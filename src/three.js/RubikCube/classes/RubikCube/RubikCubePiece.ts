import * as THREE from 'three';
import type { TRubikCubePieceId } from '../../interfaces/IRubikCubeData';

export class RubikCubePiece {
  private readonly _entirePiece: THREE.Group = new THREE.Group();

  constructor(
    private readonly _id: TRubikCubePieceId,
    pieceFaces: Array<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>,
  ) {
    this._entirePiece.add(...pieceFaces);
    this._entirePiece.userData.id = _id;
  }

  get entirePiece(): THREE.Group {
    return this._entirePiece;
  }

  get id(): TRubikCubePieceId {
    return this._id;
  }
}

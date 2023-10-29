import * as THREE from 'three';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';

export class RubikCube3x3Piece implements IRubikCubePiece {
  private readonly _entirePiece: THREE.Group = new THREE.Group();

  constructor(
    private readonly _id: number,
    pieceFaces: Array<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>,
  ) {
    this._entirePiece.add(...pieceFaces);
    this._entirePiece.userData.id = _id;
  }

  get entirePiece(): THREE.Group {
    return this._entirePiece;
  }

  get id(): number {
    return this._id;
  }
}

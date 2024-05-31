import * as THREE from 'three';
import type { RubikCubePieceFace } from './rubik-cube-piece-face';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece';

/**
 * Class for the RubikCubePiece class. Extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>, because it implements the IRubikCubePiece interface, which extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class.
 */
export class RubikCubePiece extends THREE.Group implements IRubikCubePiece {
  constructor(
    private readonly _pieceId: number,
    private readonly _pieceFaces: Array<RubikCubePieceFace>,
  ) {
    super();
    this.add(..._pieceFaces);
  }

  public get pieceId(): number {
    return this._pieceId;
  }

  public get pieceFaces(): Array<RubikCubePieceFace> {
    return this._pieceFaces;
  }

  public dispose() {
    this._pieceFaces.forEach((face) => face.dispose());
  }
}

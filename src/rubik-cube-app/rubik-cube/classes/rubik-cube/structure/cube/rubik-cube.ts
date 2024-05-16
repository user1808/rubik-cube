import * as THREE from 'three';
import type { IRubikCube } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece';

/**
 * Class for the RubikCube class. Extends the THREE.Group class because it implements the IRubikCube interface, which extends the THREE.Group class.
 */
export class RubikCube extends THREE.Group implements IRubikCube {
  constructor(private readonly _cubePieces: Array<IRubikCubePiece>) {
    super();
    this.add(..._cubePieces);
  }

  public get cubePieces(): Array<IRubikCubePiece> {
    return this._cubePieces;
  }

  public dispose() {
    this._cubePieces.forEach((piece) => piece.dispose());
  }
}

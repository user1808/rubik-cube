import * as THREE from 'three';
import type { RubikCubePiece } from '../piece/rubik-cube-piece';

export class RubikCube extends THREE.Group {
  constructor(private readonly _cubePieces: Array<RubikCubePiece>) {
    super();
    this.add(..._cubePieces);
  }

  public get cubePieces(): Array<RubikCubePiece> {
    return this._cubePieces;
  }

  public dispose() {
    this._cubePieces.forEach((piece) => piece.dispose());
  }
}

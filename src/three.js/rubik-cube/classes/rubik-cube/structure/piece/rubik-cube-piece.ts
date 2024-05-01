import * as THREE from 'three';
import type { RubikCubePieceFace } from './rubik-cube-piece-face';

export class RubikCubePiece extends THREE.Group {
  constructor(private readonly _pieceFaces: Array<RubikCubePieceFace>) {
    super();
    this.add(..._pieceFaces);
  }

  public get pieceFaces(): Array<RubikCubePieceFace> {
    return this._pieceFaces;
  }
}

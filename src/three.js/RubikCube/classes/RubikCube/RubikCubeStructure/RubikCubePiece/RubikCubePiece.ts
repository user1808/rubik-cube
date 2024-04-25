import * as THREE from 'three';
import type { RubikCubePieceFace } from './RubikCubePieceFace';

export class RubikCubePiece extends THREE.Group {
  constructor(private readonly _pieceFaces: Array<RubikCubePieceFace>) {
    super();
    this.children = _pieceFaces;
  }

  public get pieceFaces(): Array<RubikCubePieceFace> {
    return this._pieceFaces;
  }
}

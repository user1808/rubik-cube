import type { RubikCubePiece } from './RubikCubePiece';

export class RubikCubePieceWrapper {
  constructor(private _piece: RubikCubePiece) {}

  public get piece(): RubikCubePiece {
    return this._piece;
  }

  public set piece(newPiece: RubikCubePiece) {
    this._piece = newPiece;
  }
}

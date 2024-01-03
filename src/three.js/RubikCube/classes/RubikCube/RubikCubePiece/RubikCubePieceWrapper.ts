import type { RubikCubePiece } from './RubikCubePiece';

export class RubikCubePieceWrapper {
  constructor(private readonly _piece: RubikCubePiece) {}

  public get piece(): RubikCubePiece {
    return this._piece;
  }
}

import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece';
import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece-wrapper';

export class RubikCubePieceWrapper implements IRubikCubePieceWrapper {
  constructor(private readonly _piece: IRubikCubePiece) {}

  public get piece(): IRubikCubePiece {
    return this._piece;
  }
}

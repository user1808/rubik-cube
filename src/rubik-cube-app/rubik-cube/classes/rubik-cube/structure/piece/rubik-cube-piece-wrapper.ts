import type {
  IRubikCubePiece,
  IRubikCubePieceWrapper,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubePieceWrapper implements IRubikCubePieceWrapper {
  constructor(private readonly _piece: IRubikCubePiece) {}

  public get piece(): IRubikCubePiece {
    return this._piece;
  }
}

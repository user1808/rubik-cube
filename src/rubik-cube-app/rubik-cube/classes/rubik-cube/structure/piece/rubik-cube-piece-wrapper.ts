import type {
  IRubikCubePiece,
  IRubikCubePieceWrapper,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubePieceWrapper implements IRubikCubePieceWrapper {
  constructor(public readonly piece: IRubikCubePiece) {}
}

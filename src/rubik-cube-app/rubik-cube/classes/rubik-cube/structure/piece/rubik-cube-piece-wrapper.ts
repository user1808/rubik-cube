import type {
  IRubikCubePiece,
  IRubikCubePieceWrapper,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubePieceWrapper<TCubeFacesNames extends string>
  implements IRubikCubePieceWrapper<TCubeFacesNames>
{
  constructor(public readonly piece: IRubikCubePiece<TCubeFacesNames>) {}
}

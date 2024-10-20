import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export type TCubePieces<TCubeFacesNames extends string> = Array<
  IRubikCubePieceWrapper<TCubeFacesNames>
>;

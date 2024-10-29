import type { TPieceIdx } from '../../types/rubik-cube';

export interface IRubikCubeFacesData<TCubeFacesNames extends string> {
  readonly facesPiecesIdxs: Record<TCubeFacesNames, Array<TPieceIdx>>;
}

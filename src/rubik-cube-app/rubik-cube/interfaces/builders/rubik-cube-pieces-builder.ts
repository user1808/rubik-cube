import type { TCubePieces } from '../../types/rubik-cube';
import type { IRubikCubeMaterials } from '../data';

export interface IRubikCubePiecesBuilder<
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
> {
  readonly materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>;

  buildPieces(): Promise<TCubePieces<TCubeFacesNames>>;
}

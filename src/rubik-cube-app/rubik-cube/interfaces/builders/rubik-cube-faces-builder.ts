import type { TCubeFaces, TCubePieces } from '../../types/rubik-cube';

export interface IRubikCubeFacesBuilder<TCubeFacesNames extends string> {
  buildFaces(cubePieces: TCubePieces<TCubeFacesNames>): TCubeFaces<TCubeFacesNames>;
}

import type { TCubeFaceColor } from './cube-face-color';
import type { TCubePieces } from './cube-pieces';

export type TCubeFaces<TCubeFacesNames extends string> = {
  physical: Record<TCubeFacesNames, TCubePieces<TCubeFacesNames>>;
  logical: Record<TCubeFacesNames, Array<Nullable<TCubeFaceColor>>>;
};

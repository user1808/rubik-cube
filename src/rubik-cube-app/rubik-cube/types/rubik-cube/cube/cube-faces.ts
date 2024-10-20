import type { TCubePieces } from './cube-pieces';

export type TCubeFaces<TCubeFacesNames extends string> = Record<
  TCubeFacesNames,
  TCubePieces<TCubeFacesNames>
>;

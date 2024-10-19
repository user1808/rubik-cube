import type { TCubePieces } from '../cube/cube-pieces';

export type TRotationGroups<
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
> = Record<TCubeRotationGroups, TCubePieces<TCubeFacesNames>>;

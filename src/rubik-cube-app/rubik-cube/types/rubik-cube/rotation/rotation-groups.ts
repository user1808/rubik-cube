import type { TCubePieces } from '../cube/cube-pieces';

export type TRotationGroups<TCubeRotationGroups extends string> = Record<
  TCubeRotationGroups,
  TCubePieces
>;

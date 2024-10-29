import type { TShellRotationData } from './shell-rotation-data';

export type TShellPieceData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> = Array<TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>>;

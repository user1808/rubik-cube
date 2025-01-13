import type { Vector3 } from 'three';

export type TShellRotationData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> = {
  direction: Vector3;
  rotationGroup: TCubeRotationGroups;
  rotationType: TCubeRotationTypes;
};

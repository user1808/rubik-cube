import * as THREE from 'three';

export type TShellRotationData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> = {
  direction: THREE.Vector3;
  rotationGroup: TCubeRotationGroups;
  rotationType: TCubeRotationTypes;
};

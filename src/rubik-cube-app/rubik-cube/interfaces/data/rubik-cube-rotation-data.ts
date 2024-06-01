import type { TRotationTypeData } from '../../types/rubik-cube';

export interface IRubikCubeRotationData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  get rotationTypesData(): Record<TCubeRotationTypes, TRotationTypeData>;
  get rotationGroupsNormalVectors(): Record<TCubeRotationGroups, THREE.Vector3>;
  get rotationGroupsNewIdxs(): Record<
    TCubeRotationTypes,
    Record<TCubeRotationGroups, Array<number>>
  >;
}

import type { Vector3 } from 'three';
import type { TRotationTypeData } from '../../types/rubik-cube';

export interface IRubikCubeRotationData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  readonly rotationTypesData: Record<TCubeRotationTypes, TRotationTypeData>;
  readonly rotationGroupsNormalVectors: Record<TCubeRotationGroups, Vector3>;
  readonly rotationPiecesChangesPatterns: Record<
    TCubeRotationTypes,
    Record<TCubeRotationGroups, Array<number>>
  >;
}

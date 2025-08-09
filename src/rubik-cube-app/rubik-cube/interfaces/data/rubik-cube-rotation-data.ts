import type { Vector3 } from 'three';

export interface IRubikCubeRotationData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  readonly rotationAngles: Record<TCubeRotationTypes, number>;
  readonly rotationGroupsNormalVectors: Record<TCubeRotationGroups, Vector3>;
  readonly rotationPiecesChangesPatterns: Record<
    TCubeRotationTypes,
    Record<TCubeRotationGroups, Array<number>>
  >;
  readonly rotationGroupsNotation: Record<TCubeRotationGroups, string>;
  readonly rotationTypesNotation: Record<TCubeRotationTypes, string>;
  readonly contraryRotationTypes: Record<TCubeRotationTypes, TCubeRotationTypes>;
}

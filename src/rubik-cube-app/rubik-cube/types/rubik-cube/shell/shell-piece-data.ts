export type TShellPieceData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> = Array<{
  direction: THREE.Vector3;
  rotationGroup: TCubeRotationGroups;
  rotationType: TCubeRotationTypes;
}>;

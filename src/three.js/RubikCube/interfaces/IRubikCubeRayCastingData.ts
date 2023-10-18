import * as THREE from 'three';

export interface IRubikCubeRayCastingData<FaceNames extends string, RotationTypes extends string> {
  get faceSelectionConditions(): Record<
    FaceNames,
    (selectedPieceFaceIntersection: THREE.Intersection) => boolean
  >;
  get selectedPiecesRotationType(): Record<
    FaceNames,
    Array<{
      faceSelectedPiecesIdxs: Array<number>;
      faceToRotate: FaceNames;
      rotationType: RotationTypes;
    }>
  >;
}

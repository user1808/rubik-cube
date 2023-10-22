import * as THREE from 'three';

export interface IRubikCubeRayCastingHelper<
  FaceNames extends string,
  RotationTypes extends string,
> {
  checkIntersecton(instersection: THREE.Intersection): {
    face: FaceNames;
    rotation: RotationTypes;
  } | null;
}

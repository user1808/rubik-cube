import * as THREE from 'three';
import type { IRubikCube } from './IRubikCube';

export interface IRubikCubeRayCastingHelper<
  FaceNames extends string,
  RotationTypes extends string,
> {
  checkIntersecton(
    cube: IRubikCube<FaceNames>,
    instersection: THREE.Intersection,
  ): Nullable<{
    face: FaceNames;
    rotation: RotationTypes;
  }>;
}

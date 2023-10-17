import * as THREE from 'three';
import type { IRubikCube } from './IRubikCube';

export interface IRubikCubeRotationHelper<
  FaceNames extends string,
  PieceCoverFaceName extends string,
  RotationTypes extends string,
> {
  rotateCube(
    scene: THREE.Scene,
    cube: IRubikCube<FaceNames, PieceCoverFaceName>,
    face: FaceNames,
    rotationType: RotationTypes,
  ): void;
}

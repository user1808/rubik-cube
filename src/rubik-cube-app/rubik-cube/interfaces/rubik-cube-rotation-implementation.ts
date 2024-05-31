import * as THREE from 'three';
import type { IRubikCube } from './structure/rubik-cube';

export interface IRubikCubeRotationImplementation<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  rotateRubikCubeGroup(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    rubikCube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes>,
    scene: THREE.Scene,
  ): Promise<void>;
}

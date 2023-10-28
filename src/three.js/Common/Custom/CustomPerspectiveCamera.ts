import * as THREE from 'three';
import type { ScreenSizeRepo } from '../ScreenSizeRepo';

export class CustomPersepctiveCamera extends THREE.PerspectiveCamera {
  readonly fov: number = 75;
  readonly near: number = 0.1;
  readonly far: number = 15;
  readonly position: THREE.Vector3 = new THREE.Vector3(5, 5, 7).normalize().multiplyScalar(8);

  constructor({ width, height }: ScreenSizeRepo) {
    super();
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

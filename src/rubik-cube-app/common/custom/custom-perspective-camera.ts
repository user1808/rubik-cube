import * as THREE from 'three';
import type { ScreenSize } from '../screen-size';

export class CustomPersepctiveCamera extends THREE.PerspectiveCamera {
  override readonly fov: number = 75;
  override readonly near: number = 0.1;
  override readonly far: number = 15;
  override readonly position: THREE.Vector3 = new THREE.Vector3(5, 5, 7)
    .normalize()
    .multiplyScalar(8);

  constructor({ width, height }: ScreenSize) {
    super();
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

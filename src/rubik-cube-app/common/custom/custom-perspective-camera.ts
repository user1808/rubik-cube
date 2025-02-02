import { PerspectiveCamera, Vector3 } from 'three';
import type { ScreenSize } from '../screen-size';

export class CustomPersepctiveCamera extends PerspectiveCamera {
  override readonly fov: number = 75;
  override readonly near: number = 0.1;
  override readonly far: number = 20;
  override readonly position: Vector3 = new Vector3(5, 5, 7).normalize().multiplyScalar(8);

  constructor({ width, height }: ScreenSize) {
    super();
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

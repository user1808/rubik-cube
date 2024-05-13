import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CustomOrbitControls extends OrbitControls {
  override readonly enablePan: boolean = false;
  override readonly minDistance: number = 2 * Math.SQRT2;
  override readonly maxDistance: number = 12;
  override readonly enableDamping: boolean = true;
}

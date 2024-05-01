import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CustomOrbitControls extends OrbitControls {
  readonly enablePan: boolean = false;
  readonly minDistance: number = 2 * Math.SQRT2;
  readonly maxDistance: number = 12;
  readonly enableDamping: boolean = true;
}

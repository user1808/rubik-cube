import type { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useOrbitControlsDataStore } from '@/stores/use-orbit-controls-data-store';

export class CustomOrbitControls extends OrbitControls {
  override readonly enablePan: boolean = false;
  override readonly minDistance: number = 2 * Math.SQRT2;
  override readonly maxDistance: number = 12;
  override readonly enableDamping: boolean = true;

  private readonly store = useOrbitControlsDataStore();

  constructor(camera: PerspectiveCamera, domElement: HTMLElement) {
    super(camera, domElement);
    this.store.init(this.maxDistance, this.getDistance());
    this.addEventListener('end', () => this.store.setDistance(this.getDistance()));
  }
}

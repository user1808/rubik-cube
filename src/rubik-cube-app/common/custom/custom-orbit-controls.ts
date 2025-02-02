import type { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useOrbitControlsDataStore } from '@/stores/use-orbit-controls-data-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';

export class CustomOrbitControls extends OrbitControls {
  private readonly cameraNear;

  private readonly maxDistanceFactor = 4;

  override readonly enablePan: boolean = false;
  override minDistance: number = 0;
  override maxDistance: number = Infinity;
  override readonly enableDamping: boolean = true;

  private readonly orbitControlsStore = useOrbitControlsDataStore();
  private readonly selectedCubeStore = useSelectedCubeStore();

  constructor(camera: PerspectiveCamera, domElement: HTMLElement) {
    super(camera, domElement);

    this.cameraNear = camera.near;

    this.setDistances();

    this.addEventListener('end', () => this.orbitControlsStore.setDistance(this.getDistance()));
    this.selectedCubeStore.$subscribe(() => this.setDistances());
  }

  private setDistances() {
    this.minDistance = this.selectedCubeStore.getCurrentCube.cameraMinDistance + this.cameraNear;
    this.maxDistance = this.maxDistanceFactor * this.minDistance;
    this.orbitControlsStore.setMaxDistance(this.maxDistance);
    this.orbitControlsStore.setDistance(this.getDistance());
  }
}

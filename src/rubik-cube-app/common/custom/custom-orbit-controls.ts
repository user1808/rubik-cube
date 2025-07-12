import { useEventBus } from '@vueuse/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useOrbitControlsDataStore } from '@/stores/use-orbit-controls-data-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import type { CustomPersepctiveCamera } from './custom-perspective-camera';
import { useInteractionModeStore } from '@/stores/use-interaction-mode-store';
import { useOrbitControlsEventBus } from '@/event-buses/use-orbit-controls-event-bus';
import { gsap } from 'gsap';
import { Vector3 } from 'three';

export class CustomOrbitControls extends OrbitControls {
  private readonly cameraNear;

  private readonly maxDistanceFactor = 4;

  override readonly enablePan: boolean = false;
  override minDistance: number = 0;
  override maxDistance: number = Infinity;
  override readonly enableDamping: boolean = true;

  private readonly orbitControlsStore = useOrbitControlsDataStore();
  private readonly selectedCubeStore = useSelectedCubeStore();
  private readonly interactionModeStore = useInteractionModeStore();

  private readonly orbitControlsEventBus = useEventBus(useOrbitControlsEventBus);

  private readonly manualRotationAmount = Math.PI / 18;
  private isManualMovePending = false;

  constructor(
    private readonly camera: CustomPersepctiveCamera,
    domElement: HTMLElement,
  ) {
    super(camera, domElement);

    this.cameraNear = camera.near;

    this.setDistances();
    this.toggleEnabled();

    this.addEventListener('end', () => this.orbitControlsStore.setDistance(this.getDistance()));
    this.selectedCubeStore.$subscribe(() => this.setDistances());
    this.interactionModeStore.$subscribe(() => this.toggleEnabled());

    this.orbitControlsEventBus.on(async (event) => {
      if (this.isManualMovePending) return;

      let distance = this.getDistance();
      let polarAngle = this.getPolarAngle();
      let azimuthalAngle = this.getAzimuthalAngle();

      if (event === 'rotate-left') {
        azimuthalAngle -= this.manualRotationAmount;
      }
      if (event === 'rotate-right') {
        azimuthalAngle += this.manualRotationAmount;
      }
      if (event === 'rotate-top') {
        polarAngle = Math.max(polarAngle - this.manualRotationAmount, 0.01);
      }
      if (event === 'rotate-bottom') {
        polarAngle = Math.min(polarAngle + this.manualRotationAmount, Math.PI - 0.01);
      }
      if (event === 'zoom-in') {
        distance *= 0.9;
      }
      if (event === 'zoom-out') {
        distance *= 1.1;
      }

      const newY = distance * Math.cos(polarAngle);
      const newX = distance * Math.sin(polarAngle) * Math.sin(azimuthalAngle);
      const newZ = distance * Math.sin(polarAngle) * Math.cos(azimuthalAngle);

      this.isManualMovePending = true;
      await this.rotateCamera(new Vector3(newX, newY, newZ));
      this.isManualMovePending = false;
    });
  }

  private async rotateCamera(newPosition: Vector3): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 0.15,
        ease: 'none',
        onComplete: () => resolve(),
      });
    });
  }

  private setDistances() {
    this.minDistance = this.selectedCubeStore.getCurrentCube.cameraMinDistance + this.cameraNear;
    this.maxDistance = this.maxDistanceFactor * this.minDistance;
    this.camera.position
      .copy(this.camera.normalizedDefaultPosition)
      .multiplyScalar(this.maxDistance);
    this.orbitControlsStore.setMaxDistance(this.maxDistance);
    this.orbitControlsStore.setDistance(this.getDistance());
  }

  public toggleEnabled(newEnabled?: boolean) {
    if (
      this.interactionModeStore.interactionMode === 'Cube Only' ||
      (this.interactionModeStore.interactionMode === 'Camera Or Cube' &&
        this.interactionModeStore.cameraOrCube === 'Cube')
    ) {
      this.enabled = false;
    } else {
      this.enabled = newEnabled ?? true;
    }
  }
}

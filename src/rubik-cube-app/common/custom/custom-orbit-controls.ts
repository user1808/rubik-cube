import { useEventBus } from '@vueuse/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useOrbitControlsDataStore } from '@/stores/use-orbit-controls-data-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import type { CustomPersepctiveCamera } from './custom-perspective-camera';
import { useInteractionModeStore } from '@/stores/use-interaction-mode-store';
import { useOrbitControlsEventBus } from '@/event-buses/use-orbit-controls-event-bus';
import { gsap } from 'gsap';
import { Vector3 } from 'three';
import { useInteractionModeEventBus } from '@/event-buses/use-interaction-mode-event-bus';
import { useUpdateCubePropertiesEventBus } from '@/event-buses/use-update-cube-properties-event-bus';

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
  private readonly interactionModeEventBus = useEventBus(useInteractionModeEventBus);
  private readonly updateCubePropertiesEventBus = useEventBus(useUpdateCubePropertiesEventBus);

  private readonly manualRotationAmount = Math.PI / 18;
  private isManualMovePending = false;

  constructor(
    private readonly camera: CustomPersepctiveCamera,
    domElement: HTMLElement,
  ) {
    super(camera, domElement);

    this.cameraNear = camera.near;

    this.setDistances();
    this.updateEnabled();

    this.addEventListener('end', () => this.orbitControlsStore.setDistance(this.getDistance()));

    this.updateCubePropertiesEventBus.on((event) => {
      switch (event) {
        case 'update-cube-properties':
          this.setDistances();
          return;
        default:
          event satisfies never;
          return;
      }
    });

    this.orbitControlsEventBus.on(async (event) => {
      if (this.isManualMovePending) return;

      let distance = this.getDistance();
      let polarAngle = this.getPolarAngle();
      let azimuthalAngle = this.getAzimuthalAngle();

      switch (event) {
        case 'rotate-left':
          azimuthalAngle -= this.manualRotationAmount;
          break;
        case 'rotate-right':
          azimuthalAngle += this.manualRotationAmount;
          break;
        case 'rotate-top':
          polarAngle = Math.max(polarAngle - this.manualRotationAmount, 0.01);
          break;
        case 'rotate-bottom':
          polarAngle = Math.min(polarAngle + this.manualRotationAmount, Math.PI - 0.01);
          break;
        case 'zoom-in':
          distance *= 0.9;
          break;
        case 'zoom-out':
          distance *= 1.1;
          break;
        default:
          event satisfies never;
      }

      const newY = distance * Math.cos(polarAngle);
      const newX = distance * Math.sin(polarAngle) * Math.sin(azimuthalAngle);
      const newZ = distance * Math.sin(polarAngle) * Math.cos(azimuthalAngle);

      this.isManualMovePending = true;
      await this.rotateCamera(new Vector3(newX, newY, newZ));
      this.isManualMovePending = false;
    });

    this.interactionModeEventBus.on((event) => {
      switch (event) {
        case 'update-interaction-mode-controls':
          this.updateEnabled();
          return;
        default:
          event satisfies never;
          return;
      }
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
    const cubeCameraMinDistance: number =
      this.selectedCubeStore.getCurrentCubeProperties?.cameraMinDistance ?? 0;
    this.minDistance = cubeCameraMinDistance + this.cameraNear;
    this.maxDistance = this.maxDistanceFactor * this.minDistance;
    this.camera.position
      .copy(this.camera.normalizedDefaultPosition)
      .multiplyScalar(this.maxDistance);
    this.orbitControlsStore.setMaxDistance(this.maxDistance);
    this.orbitControlsStore.setDistance(this.getDistance());
  }

  public updateEnabled(newEnabled?: boolean) {
    const { getInteractionMode, getCameraOrCubeOption } = this.interactionModeStore;
    if (
      getInteractionMode === 'Cube Only' ||
      (getInteractionMode === 'Camera Or Cube' && getCameraOrCubeOption === 'Cube')
    ) {
      this.enabled = false;
    } else {
      this.enabled = newEnabled ?? true;
    }
  }
}

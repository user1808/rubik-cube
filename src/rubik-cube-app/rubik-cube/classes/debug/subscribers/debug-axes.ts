import * as THREE from 'three';
import type { IDebugModeSubscriber } from '../../../interfaces/debug';

export class DebugAxes implements IDebugModeSubscriber {
  private debugAxes: THREE.AxesHelper;

  constructor(
    private readonly scene: THREE.Scene,
    axesSize: number = 5,
  ) {
    this.debugAxes = new THREE.AxesHelper(axesSize);
  }

  public onDebugModeChange(isDebugMode: boolean): void {
    if (isDebugMode) {
      this.debugAxes.position.set(0, 0, 0);
      this.scene.add(this.debugAxes);
    } else {
      this.scene.remove(this.debugAxes);
    }
  }
}

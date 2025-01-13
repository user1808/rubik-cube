import type { Scene } from 'three';
import { AxesHelper } from 'three';
import type { IDebugModeSubscriber } from '../../../interfaces/debug';

export class DebugAxes implements IDebugModeSubscriber {
  private debugAxes: AxesHelper;

  constructor(
    private readonly scene: Scene,
    axesSize: number = 5,
  ) {
    this.debugAxes = new AxesHelper(axesSize);
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

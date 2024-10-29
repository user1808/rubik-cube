import Stats from 'three/examples/jsm/libs/stats.module.js';
import type { IDebugModeSubscriber } from '../../../interfaces/debug';

export class DebugStats implements IDebugModeSubscriber {
  private stats: Stats = new Stats();

  public onDebugModeChange(isDebugMode: boolean): void {
    if (isDebugMode) {
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    } else {
      this.stats.dom.remove();
    }
  }

  public start(): void {
    this.stats.begin();
  }

  public end(): void {
    this.stats.end();
  }
}

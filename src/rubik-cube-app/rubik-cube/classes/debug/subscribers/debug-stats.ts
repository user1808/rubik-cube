import Stats from 'stats-gl';
import type { IDebugModeSubscriber } from '../../../interfaces/debug';

export class DebugStats implements IDebugModeSubscriber {
  private stats: Stats = new Stats({
    horizontal: false,
    minimal: false,
  });

  public onDebugModeChange(isDebugMode: boolean): void {
    if (isDebugMode) {
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

  public update(): void {
    this.stats.update();
  }
}

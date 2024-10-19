import type { IDebugModeSubscriber } from '../../interfaces/debug';

export class DebugModePublisher {
  private isDebugMode: boolean = false;
  private subscribers: Array<IDebugModeSubscriber> = [];

  constructor() {
    window.addEventListener('hashchange', this.checkDebugModeListener);
    this.checkDebugMode();
  }

  public subscribe(subscriber: IDebugModeSubscriber): void {
    this.subscribers.push(subscriber);
    subscriber.onDebugModeChange(this.isDebugMode);
  }

  public unsubscribe(subscriber: IDebugModeSubscriber): void {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  public notify(isDebugMode: boolean): void {
    this.subscribers.forEach((s) => s.onDebugModeChange(isDebugMode));
  }

  private checkDebugModeListener = () => {
    this.checkDebugMode();
  };

  private checkDebugMode(): void {
    this.isDebugMode = window.location.hash === '#debug';
    this.notify(this.isDebugMode);
  }
}

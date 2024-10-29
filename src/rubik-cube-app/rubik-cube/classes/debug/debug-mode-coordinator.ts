import type { IDebugModeSubscriber } from '../../interfaces/debug';
import { DebugModePublisher } from './debug-mode-publisher';

export class DebugModeCoordinator<Subscribers extends Record<string, IDebugModeSubscriber>> {
  private readonly debugModePublisher: DebugModePublisher = new DebugModePublisher();

  constructor(private readonly subscribers: Subscribers) {
    Object.values(this.subscribers).forEach((s) => this.debugModePublisher.subscribe(s));
  }

  public getSubscriber<Key extends keyof Subscribers>(key: Key): Subscribers[Key] {
    return this.subscribers[key];
  }
}

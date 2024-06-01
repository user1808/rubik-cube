import * as THREE from 'three';
import type { ScreenSize } from './screen-size';

export class MouseTouchTracker {
  private readonly _pointerPosition: THREE.Vector2 = new THREE.Vector2();

  constructor(private readonly screenSize: ScreenSize) {
    window.addEventListener('mousemove', (event) => {
      this._pointerPosition.x = (event.clientX / screenSize.width) * 2 - 1;
      this._pointerPosition.y = -((event.clientY / screenSize.height) * 2 - 1);
    });
    window.addEventListener('touchmove', (event) => this.touchEventListener(event));
    window.addEventListener('touchstart', (event) => this.touchEventListener(event));
  }

  public get pointerPosition(): THREE.Vector2 {
    return this._pointerPosition;
  }

  private touchEventListener(event: TouchEvent): void {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }
    this._pointerPosition.x = (touch.clientX / this.screenSize.width) * 2 - 1;
    this._pointerPosition.y = -((touch.clientY / this.screenSize.height) * 2 - 1);
  }
}

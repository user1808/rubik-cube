import { WebGLRenderer } from 'three';
import type { ScreenSize } from '../screen-size';

export class CustomRenderer extends WebGLRenderer {
  constructor(canvas: HTMLCanvasElement, { width, height }: ScreenSize) {
    super({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.setSize(width, height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

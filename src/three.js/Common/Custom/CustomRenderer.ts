import * as THREE from 'three';
import type { ScreenSizeRepo } from '../ScreenSizeRepo';

export class CustomRenderer extends THREE.WebGLRenderer {
  constructor(canvas: HTMLCanvasElement, { width, height }: ScreenSizeRepo) {
    super({
      canvas,
      antialias: true,
    });
    this.setSize(width, height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

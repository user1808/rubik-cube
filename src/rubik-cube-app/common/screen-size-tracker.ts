import * as THREE from 'three';
import type { ScreenSize } from './screen-size';

export class ScreenSizeTracker {
  public startTrack(
    screenSize: ScreenSize,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) {
    window.addEventListener('resize', () => {
      screenSize.width = window.innerWidth;
      screenSize.height = window.innerHeight;

      camera.aspect = screenSize.width / screenSize.height;
      camera.updateProjectionMatrix();

      renderer.setSize(screenSize.width, screenSize.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
}

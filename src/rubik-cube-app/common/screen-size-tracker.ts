import type { PerspectiveCamera, WebGLRenderer } from 'three';
import type { ScreenSize } from './screen-size';

export class ScreenSizeTracker {
  public startTrack(screenSize: ScreenSize, camera: PerspectiveCamera, renderer: WebGLRenderer) {
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

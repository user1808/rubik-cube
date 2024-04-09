import type { ScreenSizeRepo } from './ScreenSizeRepo';

export class ScreenSizeTracker {
  constructor(
    screenSizeRepo: ScreenSizeRepo,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) {
    window.addEventListener('resize', () => {
      screenSizeRepo.width = window.innerWidth;
      screenSizeRepo.height = window.innerHeight;

      camera.aspect = screenSizeRepo.width / screenSizeRepo.height;
      camera.updateProjectionMatrix();

      renderer.setSize(screenSizeRepo.width, screenSizeRepo.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
}

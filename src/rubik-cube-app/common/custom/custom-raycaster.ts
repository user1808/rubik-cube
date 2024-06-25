import * as THREE from 'three';
import type { MouseTouchTracker } from '../mouse-touch-tracker';
import { MouseButtonEnum } from '@/utils/mouse_button_enum';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { IRubikCube } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

// TODO: Amend this class
export class CustomRaycaster<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  private readonly mouseMoveLimit = 10;
  private mouseMoveCounter = 0;
  private readonly raycaster: THREE.Raycaster = new THREE.Raycaster();
  private firstIntersectionPoint: Nullable<THREE.Vector3> = null;
  private firstIntersectionName: Nullable<TCubeShellPieces> = null;
  private cube: Nullable<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>> =
    null;

  constructor(
    private readonly mouseTouchTracker: MouseTouchTracker,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly orbitControls: OrbitControls,
    private readonly scene: THREE.Scene,
  ) {
    window.addEventListener('mousedown', (event) => {
      if (event.button !== MouseButtonEnum.Main) return;
      this.firstIntersectionPoint = this.getIntersectionPoint();
      orbitControls.enabled = !this.firstIntersectionPoint;

      if (!this.firstIntersectionPoint) return;
      // const testVector = new THREE.Vector3(0, 0, -1);
      // const rotationVector = new THREE.Vector3(0, -1, 0);
      // const directionHelper = new THREE.ArrowHelper(
      //   testVector,
      //   this.firstIntersectionPoint,
      //   2,
      //   0x00fff0, // blue
      // );
      // this.scene.add(directionHelper);
      // const rotationHelper = new THREE.ArrowHelper(
      //   rotationVector,
      //   this.firstIntersectionPoint,
      //   2,
      //   0xffffff, // white
      // );
      // this.scene.add(rotationHelper);
      // const rotatedVector = testVector.applyAxisAngle(rotationVector.normalize(), Math.PI / 3);
      // console.log(rotatedVector.normalize());
      // const rotatedHelper = new THREE.ArrowHelper(
      //   rotatedVector,
      //   this.firstIntersectionPoint,
      //   6,
      //   0xffff00, // yellow
      // );
      // this.scene.add(rotatedHelper);
    });
    window.addEventListener('mouseup', (event) => {
      if (event.button !== MouseButtonEnum.Main) return;
      this.firstIntersectionPoint = null;
      this.firstIntersectionName = null;
      this.mouseMoveCounter = 0;
      orbitControls.enabled = true;
    });
    window.addEventListener('mousemove', (event) => {
      if (
        !this.firstIntersectionPoint ||
        !this.firstIntersectionName ||
        !this.cube ||
        event.button !== MouseButtonEnum.Main
      )
        return;

      this.mouseMoveCounter++;
      console.log(this.mouseMoveCounter);

      if (this.mouseMoveCounter < this.mouseMoveLimit) return;

      const secondPoint = this.getIntersectionPoint();
      if (!secondPoint) return;
      const direction = secondPoint.clone().sub(this.firstIntersectionPoint).normalize();

      try {
        const rotationData = this.cube.shell.pieces[this.firstIntersectionName].data;

        rotationData.forEach((rotation) => {
          const directionHelper = new THREE.ArrowHelper(
            rotation.direction,
            this.firstIntersectionPoint || undefined,
            2,
            0xffffff,
          );
          // this.scene.add(directionHelper);
        });

        rotationData.sort((a, b) => {
          return b.direction.dot(direction) - a.direction.dot(direction);
        });

        const rotation = rotationData[0];
        this.cube.rotate(rotation.rotationGroup, rotation.rotationType);
      } catch (error) {
        console.error(error);
      } finally {
        this.firstIntersectionPoint = null;
        this.firstIntersectionName = null;
        this.mouseMoveCounter = 0;
      }
    });
  }

  public registerCube(
    cube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
  ): void {
    this.cube = cube;
  }

  private getIntersectionPoint(): Nullable<THREE.Vector3> {
    if (!this.cube) return null;

    this.raycaster.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);
    const intersects = this.raycaster.intersectObject(this.cube);
    if (intersects.length > 0) {
      this.firstIntersectionName = <TCubeShellPieces>intersects[0].object.name;
      return intersects[0].point;
    }
    return null;
  }
}

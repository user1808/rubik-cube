import * as THREE from 'three';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

/**
 * DebugRaycaster class is used to show debug information about raycasting in the scene.
 * It is used to show possible rotation vectors and all intersected piece directions.
 * You can use it to debug the rotation implementation.
 */
export class DebugRaycaster {
  constructor(private readonly scene: THREE.Scene) {}

  public showPossibleRotationVectors(intersectionPoint: THREE.Vector3) {
    const testDirectionVector = new THREE.Vector3(-0.5, -0.53, -0.69);
    const pieceFaceVector = new THREE.Vector3(-0.5257, -0.4472, 0.7236);
    const directionHelper = new THREE.ArrowHelper(
      testDirectionVector,
      intersectionPoint,
      2,
      0x00fff0, // blue
    );
    this.scene.add(directionHelper);
    const pieceFaceHelper = new THREE.ArrowHelper(
      pieceFaceVector,
      intersectionPoint,
      2,
      0xffffff, // white
    );
    this.scene.add(pieceFaceHelper);
    const possibleNextVector = testDirectionVector.applyAxisAngle(
      pieceFaceVector.normalize(),
      (2 / 5) * Math.PI,
    );
    const rotatedHelper = new THREE.ArrowHelper(
      possibleNextVector,
      intersectionPoint,
      6,
      0xffff00, // yellow
    );
    this.scene.add(rotatedHelper);
    // console.log('rotatedVector', possibleNextVector);
  }

  public showAllIntersectedPieceDirections(
    rotationData: TShellPieceData<string, string>,
    intersectionPoint: THREE.Vector3,
  ) {
    rotationData.forEach((rotation) => {
      const directionHelper = new THREE.ArrowHelper(
        rotation.direction,
        intersectionPoint,
        2,
        0xffffff,
      );
      this.scene.add(directionHelper);
    });
  }
}

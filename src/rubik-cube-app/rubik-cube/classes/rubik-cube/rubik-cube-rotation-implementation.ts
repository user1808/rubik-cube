import { toRaw } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import type { TRotationTypeData } from '../../types/rubik-cube';
import type { IRubikCube, IRubikCubePieceWrapper } from '../../interfaces/structure';
import type { IRubikCubeRotationData } from '../../interfaces/data';
import type { IRubikCubeRotationImplementation } from '../../interfaces';

export class RubikCubeRotationImplementation<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> implements
    IRubikCubeRotationImplementation<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
  ) {}

  public async rotateRubikCubeGroup(
    rubikCube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
  ): Promise<void> {
    const rotatingGroup = rubikCube.rotationGroups[rotationGroup];
    const rotatingThreeJSGroup = this.createRotatingThreeJSGroup(rubikCube, rotatingGroup);

    const rotatedGroupNewIdxs =
      this.rotationData.rotationPiecesChangesPatterns[rotationType][rotationGroup];
    const rotationTypeData = this.rotationData.rotationTypesData[rotationType];
    const rotationNormal = this.rotationData.rotationGroupsNormalVectors[rotationGroup];
    rotationNormal.normalize();

    await this.rotateGroupAsync(
      rotatingGroup,
      rotatingThreeJSGroup,
      rotatedGroupNewIdxs,
      rotationTypeData,
      rotationNormal,
    );

    this.removeRotatingThreeJSGroup(rubikCube, rotatingThreeJSGroup);
  }

  private rotateGroupAsync(
    rotatingGroup: Array<IRubikCubePieceWrapper>,
    rotatingThreeJSGroup: THREE.Group,
    rotatingGroupNewIdxs: Array<number>,
    rotationTypeData: TRotationTypeData,
    rotationNormal: THREE.Vector3,
  ): Promise<void> {
    const { angle, durationInSeconds, stepsCount } = rotationTypeData;

    const singleRotationEuler = this.createSingleRotationEuler(rotationNormal, angle / stepsCount);

    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        repeat: stepsCount - 1,
        onRepeat: () => {
          this.updateRotatedGroupPresentation(rotatingGroup, rotatingThreeJSGroup);
        },
        onComplete: () => {
          timeline.kill();
          this.updateRotatedGroupPresentation(rotatingGroup, rotatingThreeJSGroup);
          this.updateRotatedGroupData(rotatingGroup, rotatingGroupNewIdxs);
          resolve();
        },
      });

      timeline.to(rotatingThreeJSGroup.rotation, {
        duration: durationInSeconds / stepsCount,
        ease: 'none',
        x: singleRotationEuler.x,
        y: singleRotationEuler.y,
        z: singleRotationEuler.z,
      });
    });
  }

  private createRotatingThreeJSGroup(
    rubikCube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    rotatingGroup: Array<IRubikCubePieceWrapper>,
  ): THREE.Group {
    const rotatingThreeJSGroup = new THREE.Group();
    rubikCube.scene.add(rotatingThreeJSGroup);
    rotatingThreeJSGroup.add(...rotatingGroup.map((pieceWrapper) => toRaw(pieceWrapper.piece)));
    return rotatingThreeJSGroup;
  }

  private removeRotatingThreeJSGroup(
    rubikCube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    rotatedThreeJSGroup: THREE.Group,
  ): void {
    rubikCube.scene.remove(rotatedThreeJSGroup);
    rubikCube.add(...rubikCube.pieces.map((pieceWrapper) => pieceWrapper.piece));
  }

  private createSingleRotationEuler(rotationNormal: THREE.Vector3, angle: number): THREE.Euler {
    const rotationEuler = new THREE.Euler();
    rotationEuler.setFromQuaternion(new THREE.Quaternion().setFromAxisAngle(rotationNormal, angle));
    return rotationEuler;
  }

  private updateRotatedGroupPresentation(
    rotatingGroup: Array<IRubikCubePieceWrapper>,
    rotatingThreeJSGroup: THREE.Group,
  ): void {
    rotatingGroup.forEach(({ piece }) => {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      piece.getWorldPosition(position);
      piece.position.set(position.x, position.y, position.z);
      rotatingThreeJSGroup.getWorldQuaternion(quaternion);
      piece.applyQuaternion(quaternion);
    });
  }

  private updateRotatedGroupData(
    rotatingGroup: Array<IRubikCubePieceWrapper>,
    rotatingGroupNewIdxs: Array<number>,
  ): void {
    const rotatedGroupCopy: Array<IRubikCubePieceWrapper> = rotatingGroup.map((pieceWrapper) =>
      Object.assign({}, pieceWrapper),
    );
    rotatingGroupNewIdxs.forEach((newIdx, idx) => {
      Object.assign(rotatingGroup[idx], rotatedGroupCopy[newIdx]);
    });
  }
}

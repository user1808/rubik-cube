import { toRaw } from 'vue';
import { Euler, Group, Vector3, Quaternion } from 'three';
import gsap from 'gsap';
import type { TRotationTypeData } from '../../types/rubik-cube';
import type { IRubikCube, IRubikCubePieceWrapper } from '../../interfaces/structure';
import type { IRubikCubeRotationData } from '../../interfaces/data';
import type { IRubikCubeRotationImplementation } from '../../interfaces';
import type { TCubeCommonNames } from '../../types/cube-common-name';

type TRotationEulers = {
  singleRotationEuler: Euler;
  entireRotationEuler: Euler;
};

export class RubikCubeRotationImplementation<
  TCubeCommonName extends TCubeCommonNames,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> implements
    IRubikCubeRotationImplementation<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
{
  constructor(
    private readonly rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
  ) {}

  public async rotateRubikCubeGroup(
    rubikCube: IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
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
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingThreeJSGroup: Group,
    rotatingGroupNewIdxs: Array<number>,
    rotationTypeData: TRotationTypeData,
    rotationNormal: Vector3,
  ): Promise<void> {
    const { angle, durationInSeconds, stepsCount } = rotationTypeData;

    const { singleRotationEuler, entireRotationEuler } = this.createRotationEulers(
      rotationNormal,
      angle,
      stepsCount,
    );

    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        repeat: stepsCount - 1,
        onRepeat: () => {
          this.updateRotatedGroupPresentation(rotatingGroup, rotatingThreeJSGroup);
        },
        onComplete: () => {
          timeline.kill();
          this.updateRotatedGroupPresentation(rotatingGroup, rotatingThreeJSGroup);
          this.updateRotatedGroupData(
            rotatingGroup,
            rotatingGroupNewIdxs,
            new Quaternion().setFromEuler(entireRotationEuler),
          );
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
    rubikCube: IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
  ): Group {
    const rotatingThreeJSGroup = new Group();
    rubikCube.scene.add(rotatingThreeJSGroup);
    rotatingThreeJSGroup.add(...rotatingGroup.map((pieceWrapper) => toRaw(pieceWrapper.piece)));
    return rotatingThreeJSGroup;
  }

  private removeRotatingThreeJSGroup(
    rubikCube: IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
    rotatedThreeJSGroup: Group,
  ): void {
    rubikCube.scene.remove(rotatedThreeJSGroup);
    rubikCube.add(...rubikCube.pieces.map((pieceWrapper) => pieceWrapper.piece));
  }

  private createRotationEulers(
    rotationNormal: Vector3,
    angle: number,
    stepsCount: number,
  ): TRotationEulers {
    const singleRotationEuler = new Euler();
    const entireRotationEuler = new Euler();
    singleRotationEuler.setFromQuaternion(
      new Quaternion().setFromAxisAngle(rotationNormal, angle / stepsCount),
    );
    entireRotationEuler.setFromQuaternion(new Quaternion().setFromAxisAngle(rotationNormal, angle));
    return { singleRotationEuler, entireRotationEuler };
  }

  private updateRotatedGroupPresentation(
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingThreeJSGroup: Group,
  ): void {
    rotatingGroup.forEach(({ piece }) => {
      const position = new Vector3();
      const quaternion = new Quaternion();
      piece.getWorldPosition(position);
      piece.position.set(position.x, position.y, position.z);
      rotatingThreeJSGroup.getWorldQuaternion(quaternion);
      piece.applyQuaternion(quaternion);
    });
  }

  private updateRotatedGroupData(
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingGroupNewIdxs: Array<number>,
    entireRotationQuaternion: Quaternion,
  ): void {
    rotatingGroup.forEach(({ piece }) => {
      piece.pieceVisibleFaces.forEach((face) => {
        face.applyQuaternionToNormal(entireRotationQuaternion);
      });
    });
    const rotatedGroupCopy: Array<IRubikCubePieceWrapper<TCubeFacesNames>> = rotatingGroup.map(
      (pieceWrapper) => Object.assign({}, pieceWrapper),
    );
    rotatingGroupNewIdxs.forEach((newIdx, idx) => {
      Object.assign(rotatingGroup[idx], rotatedGroupCopy[newIdx]);
    });
  }
}

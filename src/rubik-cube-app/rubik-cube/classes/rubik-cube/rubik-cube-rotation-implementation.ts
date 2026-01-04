import { toRaw } from 'vue';
import { Group, Vector3, Quaternion } from 'three';
import gsap from 'gsap';
import type { IRubikCube, IRubikCubePieceWrapper } from '../../interfaces/structure';
import type { IRubikCubeRotationData } from '../../interfaces/data';
import type { IRubikCubeRotationImplementation } from '../../interfaces';
import type { TCubeCommonNames } from '../../types/cube-common-name';
import type { TRotationSource } from '../../types/rubik-cube';
import { useCubeMovesHistoryStore } from '@/stores/use-cube-moves-history-store';
import { useCubeRotationTimesStore } from '@/stores/use-cube-rotation-times-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';

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
  private readonly cubeMovesHistoryStore = useCubeMovesHistoryStore();
  private readonly cubeRotationTimesStore = useCubeRotationTimesStore();
  private readonly selectedCubeStore = useSelectedCubeStore();

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
    source: TRotationSource,
  ): Promise<void> {
    const rotatingGroup = rubikCube.rotationGroups[rotationGroup];
    const rotatingThreeJSGroup = this.createRotatingThreeJSGroup(rubikCube, rotatingGroup);

    const rotatedGroupNewIdxs =
      this.rotationData.rotationPiecesChangesPatterns[rotationType][rotationGroup];
    const rotationAngle = this.rotationData.rotationAngles[rotationType];
    const rotationNormal = this.rotationData.rotationGroupsNormalVectors[rotationGroup];
    rotationNormal.normalize();

    try {
      if (source === 'interaction') {
        this.cubeMovesHistoryStore.addCubeMove(rubikCube.properties.commonName, {
          notation: `${this.rotationData.rotationGroupsNotation[rotationGroup]}${this.rotationData.rotationTypesNotation[rotationType]}`,
          rotationGroup,
          rotationType,
          contraryRotationType: this.rotationData.contraryRotationTypes[rotationType],
        });
      }
      await this.rotateGroupAsync(
        rotatingGroup,
        rotatingThreeJSGroup,
        rotatedGroupNewIdxs,
        rotationAngle,
        rotationNormal,
      );
    } catch (error) {
      if (source === 'interaction') {
        this.cubeMovesHistoryStore.removeLastCubeMove(rubikCube.properties.commonName);
      }
      console.error(error);
    }

    this.removeRotatingThreeJSGroup(rubikCube, rotatingThreeJSGroup);
  }

  private rotateGroupAsync(
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingThreeJSGroup: Group,
    rotatingGroupNewIdxs: Array<number>,
    rotationAngle: number,
    rotationNormal: Vector3,
  ): Promise<void> {
    const currentCubeName = this.selectedCubeStore.getCurrentCubeProperties?.commonName;
    const durationInSeconds = currentCubeName
      ? this.cubeRotationTimesStore.getCubeRotationTimes[currentCubeName]
      : this.cubeRotationTimesStore.getDefaultRotationTime;

    const startQ = rotatingThreeJSGroup.quaternion.clone();
    const rotationDeltaQuaternion = new Quaternion().setFromAxisAngle(
      rotationNormal,
      rotationAngle,
    );
    const deltaQ = new Quaternion();

    const target = { t: 0 };

    return new Promise((resolve) => {
      gsap.to(target, {
        t: 1,
        duration: durationInSeconds,
        ease: 'none',
        onUpdate() {
          const t = target.t;
          deltaQ.setFromAxisAngle(rotationNormal, rotationAngle * t);
          rotatingThreeJSGroup.quaternion.copy(startQ).multiply(deltaQ);
        },
        onComplete: () => {
          this.updateRotatedGroupPresentation(rotatingGroup, rotatingThreeJSGroup);
          this.updateRotatedGroupData(rotatingGroup, rotatingGroupNewIdxs, rotationDeltaQuaternion);
          resolve();
        },
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

  private updateRotatedGroupPresentation(
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingThreeJSGroup: Group,
  ): void {
    rotatingThreeJSGroup.updateMatrixWorld(true);

    const tempPosition = new Vector3();
    const tempQuaternion = new Quaternion();

    rotatingGroup.forEach(({ piece }) => {
      piece.getWorldPosition(tempPosition);
      piece.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
      rotatingThreeJSGroup.getWorldQuaternion(tempQuaternion);
      piece.applyQuaternion(tempQuaternion);
    });
  }

  private updateRotatedGroupData(
    rotatingGroup: Array<IRubikCubePieceWrapper<TCubeFacesNames>>,
    rotatingGroupNewIdxs: Array<number>,
    rotationQuaternion: Quaternion,
  ): void {
    rotatingGroup.forEach(({ piece }) => {
      piece.pieceVisibleFaces.forEach((face) => {
        face.applyQuaternionToNormal(rotationQuaternion);
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

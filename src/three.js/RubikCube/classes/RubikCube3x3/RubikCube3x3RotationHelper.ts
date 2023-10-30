import * as THREE from 'three';
import gsap from 'gsap';
import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from '../../interfaces/IRubikCubeRotationHelper';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCubeFacePiece } from '../../types/common/TRubikCubeFacePiece';

export class RubikCube3x3RotationHelper
  implements IRubikCubeRotationHelper<TRubikCube3x3FaceNames, TRubikCube3x3RotationTypes>
{
  private isRotationAllowed: boolean = true;

  constructor(
    private readonly rotationData: IRubikCubeRotationData<
      TRubikCube3x3FaceNames,
      TRubikCube3x3RotationTypes
    >,
    private readonly cubeData: IRubikCubeData<TRubikCube3x3FaceNames>,
  ) {}

  rotateCube(
    scene: THREE.Scene,
    cube: IRubikCube<TRubikCube3x3FaceNames>,
    face: TRubikCube3x3FaceNames,
    rotationType: TRubikCube3x3RotationTypes,
  ): void {
    if (!this.isRotationAllowed) {
      return;
    }

    const rotatedFace = cube.faces.get(face);
    if (!rotatedFace) {
      throw new Error();
    }

    this.isRotationAllowed = false;

    const rotationGroup = this.createGroupToPerformRotation(scene, rotatedFace);
    this.performRotation(scene, cube, rotationGroup, face, rotationType);
  }

  private createGroupToPerformRotation(
    scene: THREE.Scene,
    rotatedFace: Array<TRubikCubeFacePiece>,
  ): THREE.Group {
    const rotationGroup = new THREE.Group();
    scene.add(rotationGroup);
    rotationGroup.add(...rotatedFace.map((facePiece) => facePiece.piece.entirePiece));
    return rotationGroup;
  }

  private performRotation(
    scene: THREE.Scene,
    cube: IRubikCube<TRubikCube3x3FaceNames>,
    group: THREE.Group,
    rotatedFaceType: TRubikCube3x3FaceNames,
    rotationType: TRubikCube3x3RotationTypes,
  ) {
    const { axis, turn } = this.rotationData.facesRotationAxes[rotatedFaceType];
    const { angle, duration } = this.rotationData.rotationsBasicData[rotationType];
    gsap
      .to(group.rotation, {
        duration,
        [axis]: group.rotation[axis] + turn * angle,
      })
      .then(() => {
        this.removeGroupToPerformRotation(scene, group);
        this.updateCubeFaces(cube, rotatedFaceType, rotationType);
        this.isRotationAllowed = true;
      });
  }

  private removeGroupToPerformRotation(scene: THREE.Scene, group: THREE.Group) {
    scene.add(
      ...group.children.map((piece) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        piece.getWorldPosition(position);
        position.round();
        piece.position.set(position.x, position.y, position.z);
        group.getWorldQuaternion(quaternion);
        piece.applyQuaternion(quaternion);
        return piece;
      }),
    );
    scene.remove(group);
  }

  private updateCubeFaces(
    cube: IRubikCube<TRubikCube3x3FaceNames>,
    rotatedFaceType: TRubikCube3x3FaceNames,
    rotationType: TRubikCube3x3RotationTypes,
  ) {
    const rotatedFace = cube.faces.get(rotatedFaceType);
    if (!rotatedFace) {
      throw new Error();
    }
    const rotatedFaceClone: Array<TRubikCubeFacePiece> = rotatedFace.map((facePiece) => {
      return { piece: Object.assign({}, facePiece.piece), value: facePiece.value };
    });

    const allPiecesIdx = this.cubeData.cubeFacePiecesIdxs[rotatedFaceType];
    const { swapPiecesIdxs } = this.rotationData.rotationsBasicData[rotationType];
    for (let i = 0; i < allPiecesIdx.length; i++) {
      Object.assign(cube.pieces[allPiecesIdx[i]], rotatedFaceClone[swapPiecesIdxs[i]].piece);
      rotatedFace[i].value = rotatedFaceClone[swapPiecesIdxs[i]].value;
    }

    const logicRotationData =
      this.rotationData.facesAffectedByRotationData[rotatedFaceType][rotationType];
    const newValues = logicRotationData.map((data) => {
      return {
        faceName: data.faceTo,
        newValues: data.faceFromIdxs.map((idx) => cube.faces.get(data.faceFrom)![idx].value),
        order: data.faceToIdxs,
      };
    });

    newValues.forEach((data) => {
      const faceToUpdate = cube.faces.get(data.faceName)!;
      for (let i = 0; i < data.order.length; i++) {
        faceToUpdate[data.order[i]].value = data.newValues[i];
      }
    });
  }
}

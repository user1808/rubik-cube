import * as THREE from 'three';
import gsap from 'gsap';
import type { RubikCube } from '../../interfaces/AbstractRubikCube';
import type { IRubikCubeRotationData } from './IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from './IRubikCubeRotationHelper';
import type { TRubikCube3x3RotationTypes } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { TRubikCube3x3RealFacesNames } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3PseudoFacesNames } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import type { TRubikCube3x3FacesRelations } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3FacesRelations';
import type { TRubikCube3x3AllFaceNames } from '../../types/RubikCube3x3/TRubikCube3x3AllFaceNames';
import type {
  TRubikCubeRealFacePiece,
  TRubikCubePseudoFacePiece,
} from '../RubikCube/types/common/RubikCubeFaces.types';

export class RubikCube3x3RotationHelper
  implements
    IRubikCubeRotationHelper<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations,
      TRubikCube3x3RotationTypes
    >
{
  private isRotationAllowed: boolean = true;

  constructor(
    private readonly rotationData: IRubikCubeRotationData<
      TRubikCube3x3AllFaceNames,
      TRubikCube3x3RotationTypes
    >,
  ) {}

  rotateCube(
    scene: THREE.Scene,
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
    face: TRubikCube3x3AllFaceNames,
    rotationType: TRubikCube3x3RotationTypes,
  ): void {
    if (!this.isRotationAllowed) {
      return;
    }

    const rotatedFace = cube.faces[face];

    this.isRotationAllowed = false;

    const rotationGroup = this.createGroupToPerformRotation(scene, rotatedFace.pieces);
    this.performRotation(scene, cube, rotationGroup, face, rotationType);
  }

  private createGroupToPerformRotation(
    scene: THREE.Scene,
    rotatedFacePieces: Array<TRubikCubeRealFacePiece | TRubikCubePseudoFacePiece>,
  ): THREE.Group {
    const rotationGroup = new THREE.Group();
    scene.add(rotationGroup);
    rotationGroup.add(...rotatedFacePieces.map((facePiece) => facePiece.piece.entirePiece));
    return rotationGroup;
  }

  private performRotation(
    scene: THREE.Scene,
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
    group: THREE.Group,
    rotatedFaceType: TRubikCube3x3AllFaceNames,
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
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
    rotatedFaceType: TRubikCube3x3AllFaceNames,
    rotationType: TRubikCube3x3RotationTypes,
  ) {
    const rotatedFace = cube.faces[rotatedFaceType];
    const rotatedFaceClone: Array<TRubikCubeRealFacePiece | TRubikCubePseudoFacePiece> =
      rotatedFace.pieces.map((facePiece) => {
        if ('value' in facePiece) {
          return { piece: Object.assign({}, facePiece.piece), value: facePiece.value };
        } else {
          return { piece: Object.assign({}, facePiece.piece) };
        }
      });

    const { rotatedFaceNewPiecesIdxs } = this.rotationData.rotationsBasicData[rotationType];
    for (let i = 0; i < rotatedFace.pieces.length; i++) {
      const rotatedFacePiece = rotatedFace.pieces[i];
      const rotatedFaceClonePiece = rotatedFaceClone[rotatedFaceNewPiecesIdxs[i]];
      Object.assign(rotatedFacePiece.piece, rotatedFaceClonePiece.piece);
      if ('value' in rotatedFacePiece && 'value' in rotatedFaceClonePiece) {
        rotatedFacePiece.value = rotatedFaceClonePiece.value;
      }
    }

    const rotatedFaceRelatedFaces = rotatedFace.relatedFaces;
    const newValues = rotatedFaceRelatedFaces.map((relatedFaces, index, array) => {
      const newIndex =
        rotationType === 'Clockwise'
          ? (index + 1) % array.length
          : rotationType === 'CounterClockwise'
          ? index - 1 < 0
            ? array.length - 1
            : index - 1
          : (index + 2) % array.length;
      return {
        values: relatedFaces.sharedPiecesIdxs.map(
          (idx) => cube.faces[relatedFaces.faceName].pieces[idx].value,
        ),
        face: array[newIndex].faceName,
        idxs: array[newIndex].sharedPiecesIdxs,
      };
    });

    newValues.forEach((newValue) => {
      const faceToUpdate = cube.faces[newValue.face];
      newValue.idxs.forEach((idx, index) => {
        faceToUpdate.pieces[idx].value = newValue.values[index];
      });
    });
  }
}

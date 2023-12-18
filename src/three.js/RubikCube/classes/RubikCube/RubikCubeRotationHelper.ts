import * as THREE from 'three';
import gsap from 'gsap';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type {
  TRubikCubePseudoFace,
  TRubikCubePseudoFacePiece,
  TRubikCubeRealFace,
  TRubikCubeRealFacePiece,
} from '../../types/common/RubikCubeFaces.types';
import type { RubikCube } from './RubikCube';

type TIsRotationAllowedFlag = boolean;

export class RubikCubeRotationHelper<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
  RotationTypes extends string,
> {
  private isRotationAllowed: TIsRotationAllowedFlag = true;

  constructor(
    private readonly rotationData: IRubikCubeRotationData<
      RealFacesNames,
      PseudoFacesNames,
      RotationTypes
    >,
  ) {}

  public rotateCubeFace(
    scene: THREE.Scene,
    cube: RubikCube<RealFacesNames, PseudoFacesNames, RotationTypes>,
    faceName: RealFacesNames | PseudoFacesNames,
    rotationType: RotationTypes,
  ): void {
    if (!this.isRotationAllowed) {
      return;
    }

    this.isRotationAllowed = false;
    this.performRotationOperation(scene, cube, faceName, rotationType);
  }

  private performRotationOperation(
    scene: THREE.Scene,
    cube: RubikCube<RealFacesNames, PseudoFacesNames, RotationTypes>,
    faceName: RealFacesNames | PseudoFacesNames,
    rotationType: RotationTypes,
  ) {
    const rotatedFace = this.getRotatedFace(cube, faceName);
    const rotationFaceGroup = this.createGroupToPerformRotation(scene, rotatedFace.pieces);
    this.executeRotation(scene, faceName, rotationType, rotatedFace, rotationFaceGroup);
  }

  private getRotatedFace(
    cube: RubikCube<RealFacesNames, PseudoFacesNames, RotationTypes>,
    faceName: RealFacesNames | PseudoFacesNames,
  ): TRubikCubeRealFace<RealFacesNames> | TRubikCubePseudoFace<PseudoFacesNames> {
    if (Object.keys(cube.realFaces).includes(faceName)) {
      return cube.realFaces[faceName as keyof typeof cube.realFaces];
    } else if (Object.keys(cube.pseudoFaces).includes(faceName)) {
      return cube.pseudoFaces[faceName as keyof typeof cube.pseudoFaces];
    } else {
      throw new Error('You have passed incorrect face name');
    }
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

  private executeRotation(
    scene: THREE.Scene,
    faceName: RealFacesNames | PseudoFacesNames,
    rotationType: RotationTypes,
    rotatedFace: TRubikCubeRealFace<RealFacesNames> | TRubikCubePseudoFace<PseudoFacesNames>,
    rotatedFaceAsGroup: THREE.Group,
  ) {
    const { axis, turn } = this.rotationData.facesRotationAxes[faceName];
    const { angle, durationInSeconds } = this.rotationData.rotationsBasicData[rotationType];
    gsap
      .to(rotatedFaceAsGroup.rotation, {
        duration: durationInSeconds,
        [axis]: rotatedFaceAsGroup.rotation[axis] + turn * angle,
      })
      .then(() => {
        this.removeGroup(scene, rotatedFaceAsGroup);
        this.updateCube(rotationType, rotatedFace);
        this.isRotationAllowed = true;
      });
  }

  private removeGroup(scene: THREE.Scene, group: THREE.Group) {
    scene.add(
      ...group.children.map((piece) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        piece.getWorldPosition(position);
        piece.position.set(
          Number(position.x.toFixed(2)),
          Number(position.y.toFixed(2)),
          Number(position.z.toFixed(2)),
        );
        group.getWorldQuaternion(quaternion);
        piece.applyQuaternion(quaternion);
        return piece;
      }),
    );
    scene.remove(group);
  }

  private updateCube(
    rotationType: RotationTypes,
    rotatedFace: TRubikCubeRealFace<RealFacesNames> | TRubikCubePseudoFace<PseudoFacesNames>,
  ) {
    this.updateRotatedFace(rotationType, rotatedFace);
  }

  private updateRotatedFace(
    rotationType: RotationTypes,
    rotatedFace: TRubikCubeRealFace<RealFacesNames> | TRubikCubePseudoFace<PseudoFacesNames>,
  ) {
    const rotatedFaceFacePiecesClones: Array<TRubikCubeRealFacePiece | TRubikCubePseudoFacePiece> =
      rotatedFace.pieces.map((facePiece) => {
        if (facePiece.isRealFace) {
          return {
            isRealFace: facePiece.isRealFace,
            piece: Object.assign({}, facePiece.piece),
            value: facePiece.value,
          };
        } else {
          return { isRealFace: facePiece.isRealFace, piece: Object.assign({}, facePiece.piece) };
        }
      });

    const { rotatedFaceNewPiecesIdxs } = this.rotationData.rotationsBasicData[rotationType];
    for (let i = 0; i < rotatedFace.pieces.length; i++) {
      const rotatedFacePiece = rotatedFace.pieces[i];
      const rotatedFaceNewPiece = rotatedFaceFacePiecesClones[rotatedFaceNewPiecesIdxs[i]];
      Object.assign(rotatedFacePiece.piece, rotatedFaceNewPiece.piece);
      if (rotatedFacePiece.isRealFace && rotatedFaceNewPiece.isRealFace) {
        rotatedFacePiece.value = rotatedFaceNewPiece.value;
      }
    }
  }
}

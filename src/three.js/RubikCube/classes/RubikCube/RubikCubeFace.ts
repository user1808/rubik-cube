import * as THREE from 'three';
import gsap from 'gsap';
import { RubikCubePiece } from './RubikCubePiece/RubikCubePiece';
import type { TRubikCubeFaceRotationData } from '../../interfaces/IRubikCubeRotationData';

export class RubikCubeFace<FaceName extends string, RotationTypes extends string> {
  private readonly _groupWithDefaultData = new THREE.Group();
  private _groupWithFacePieces = new THREE.Group();

  private _piecesValues: Array<number> = [];

  constructor(
    private readonly _scene: THREE.Scene,
    private readonly _name: FaceName,
    private readonly _pieces: Array<RubikCubePiece>,
    private readonly _rotationData: TRubikCubeFaceRotationData<RotationTypes>,
    private readonly _faceNormal?: THREE.Vector3,
  ) {
    this.updateFaceValues();
  }

  public get values(): Array<number> {
    return this._piecesValues;
  }

  public updateFaceValues() {
    if (!this._faceNormal) return;
    this._piecesValues = this._pieces.map((piece) => {
      const foundFace = piece.visibleFaces.find(
        (visibleFace) => this._faceNormal && visibleFace.normal.equals(this._faceNormal),
      );
      if (!foundFace) {
        throw new Error('No visible face found!');
      }
      return foundFace.material.faceValue;
    });
  }

  public rotate(rotationType: RotationTypes, onComplete?: VoidCallback): void {
    this.fillGroupWithFacePieces(this._scene);
    const timeline: GSAPTimeline = this.createRotationTimeline(rotationType, onComplete);
    this.setRotationTimelineSteps(timeline, rotationType);
  }

  private fillGroupWithFacePieces(scene: THREE.Scene): void {
    this._groupWithFacePieces = new THREE.Group().copy(this._groupWithDefaultData);
    scene.add(this._groupWithFacePieces);
    this._pieces.forEach((piece) => piece.addToFace(this._groupWithFacePieces));
  }

  private createRotationTimeline(
    rotationType: RotationTypes,
    onComplete?: VoidCallback,
  ): GSAPTimeline {
    const { rotationSteps, durationInSeconds, rotatedFaceNewPiecesIdxs } =
      this._rotationData.rotationData[rotationType];
    const timeline: GSAPTimeline = gsap.timeline({
      defaults: {
        duration: durationInSeconds / rotationSteps.length,
      },
      onComplete: () => {
        const quaternion = this._groupWithFacePieces.getWorldQuaternion(new THREE.Quaternion());
        this.updateGroupPiecesPositionAndRotation(
          rotationType,
          this._groupWithFacePieces,
          quaternion,
        );
        this.updatePiecesRotation(quaternion);
        this.swapPieces(rotatedFaceNewPiecesIdxs);
        this.emptyGroupWithFacePieces(this._scene);
        onComplete?.();
      },
    });
    return timeline;
  }

  private setRotationTimelineSteps(timeline: GSAPTimeline, rotationType: RotationTypes): void {
    const { rotationSteps } = this._rotationData.rotationData[rotationType];
    const nextRotation = new THREE.Euler().copy(this._groupWithDefaultData.rotation);
    rotationSteps.forEach(({ angle, ease }) => {
      this.setNextRotation(nextRotation, angle);
      timeline.to(this._groupWithFacePieces.rotation, {
        ease,
        x: nextRotation.x,
        y: nextRotation.y,
        z: nextRotation.z,
      });
    });
  }

  private emptyGroupWithFacePieces(scene: THREE.Scene): void {
    scene.add(...this._groupWithFacePieces.children);
    scene.remove(this._groupWithFacePieces);
  }

  private updateGroupPiecesPositionAndRotation(
    rotationType: RotationTypes,
    groupWithFacePieces: THREE.Group,
    quaternion: THREE.Quaternion,
  ): void {
    const { precisionOfUpdatedPiecePosition: precision } =
      this._rotationData.rotationData[rotationType];
    groupWithFacePieces.children.forEach((piece) => {
      const { x, y, z } = piece.getWorldPosition(new THREE.Vector3());
      piece.position.set(
        Number(x.toFixed(precision)),
        Number(y.toFixed(precision)),
        Number(z.toFixed(precision)),
      );
      piece.applyQuaternion(quaternion);
    });
  }

  private updatePiecesRotation(quaternion: THREE.Quaternion): void {
    this._pieces.forEach((piece) => piece.rotate(quaternion));
  }

  private swapPieces(newPiecesIdxs: Array<number>): void {
    const piecesClones: Array<RubikCubePiece> = this._pieces.map((piece) =>
      Object.assign({}, piece),
    );
    for (let i = 0; i < this._pieces.length; i++) {
      Object.assign(this._pieces[i], piecesClones[newPiecesIdxs[i]]);
    }
  }

  private setNextRotation(rotationToSet: THREE.Euler, angle: number): void {
    const helperObject = new THREE.Object3D().copy(this._groupWithDefaultData);
    helperObject.rotateOnAxis(this._rotationData.rotationAxis.normalize(), angle);
    rotationToSet.set(
      rotationToSet.x + helperObject.rotation.x,
      rotationToSet.y + helperObject.rotation.y,
      rotationToSet.z + helperObject.rotation.z,
    );
  }
}

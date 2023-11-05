import * as THREE from 'three';
import type {
  TRubikCubePseudoFaces,
  TRubikCubeRealFaces,
} from '../../types/common/RubikCubeFaces.types';
import type { RubikCubePiece } from './RubikCubePiece';
import type { RubikCubeRotationHelper } from './RubikCubeRotationHelper';

export class RubikCube<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
  RotationTypes extends string,
> {
  constructor(
    private readonly _scene: THREE.Scene,
    private readonly _realFaces: TRubikCubeRealFaces<RealFacesNames>,
    private readonly _pseudoFaces: TRubikCubePseudoFaces<PseudoFacesNames>,
    private readonly _pieces: Array<RubikCubePiece>,
    private readonly _rotationHelper: RubikCubeRotationHelper<
      RealFacesNames,
      PseudoFacesNames,
      RotationTypes
    >,
  ) {}

  get realFaces(): TRubikCubeRealFaces<RealFacesNames> {
    return this._realFaces;
  }

  get pseudoFaces(): TRubikCubePseudoFaces<PseudoFacesNames> {
    return this._pseudoFaces;
  }

  get pieces(): Array<RubikCubePiece> {
    return this._pieces;
  }

  public rotateCubeFace(
    face: RealFacesNames | PseudoFacesNames,
    rotationType: RotationTypes,
  ): void {
    this._rotationHelper.rotateCubeFace(this._scene, this, face, rotationType);
  }

  public addToScene(): void {
    this._scene.add(...this.pieces.map((piece) => piece.entirePiece));
  }

  public removeFromScene(): void {
    this._pieces
      .map((piece) => piece.entirePiece)
      .forEach((entirePiece) => {
        entirePiece.traverse((child) => {
          if (
            child instanceof THREE.Mesh &&
            child.geometry instanceof THREE.BufferGeometry &&
            child.material instanceof THREE.MeshBasicMaterial
          ) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        this._scene.remove(entirePiece);
      });
  }
}

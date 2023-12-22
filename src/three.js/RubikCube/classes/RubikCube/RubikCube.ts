import * as THREE from 'three';
import type { RubikCubePiece } from './RubikCubePiece/RubikCubePiece';
import type { RubikCubeFace } from './RubikCubeFace';

type TIsRotationPendingFlag = boolean;
type TIsCubeOnSceneFlag = boolean;
export type TRubikCubeFaces<FacesNames extends string, RotationTypes extends string> = {
  [FaceName in FacesNames]: RubikCubeFace<FaceName, RotationTypes>;
};

export class RubikCube<FacesNames extends string, RotationTypes extends string> {
  private _isRotationPending: TIsRotationPendingFlag = false;
  private _isCubeOnScene: TIsCubeOnSceneFlag = false;

  constructor(
    private readonly _scene: THREE.Scene,
    private readonly _faces: TRubikCubeFaces<FacesNames, RotationTypes>,
    private readonly _pieces: Array<RubikCubePiece>,
  ) {}

  public get faces(): TRubikCubeFaces<FacesNames, RotationTypes> {
    return this._faces;
  }

  public get facesValues(): Record<FacesNames, Array<number>> {
    return Object.fromEntries(
      Object.entries<(typeof this._faces)[keyof typeof this._faces]>(this._faces).map(
        ([key, face]) => [key, face.values],
      ),
    ) as Record<keyof typeof this._faces, Array<number>>;
  }

  public rotateCubeFace(
    face: FacesNames,
    rotationType: RotationTypes,
    onComplete?: VoidCallback,
  ): void {
    if (this._isRotationPending || !this._isCubeOnScene) return;

    this._isRotationPending = true;
    this._faces[face].rotate(rotationType, () => {
      Object.values<(typeof this._faces)[keyof typeof this._faces]>(this._faces).forEach((face) =>
        face.updateFaceValues(),
      );
      this._isRotationPending = false;
      onComplete?.();
    });
  }

  public addToScene(): void {
    this._pieces.forEach((piece) => piece.addToScene(this._scene));
    this._isCubeOnScene = true;
  }

  public removeFromScene(): void {
    if (this._isRotationPending) return;
    this._pieces.forEach((piece) => piece.removeFromScene(this._scene));
    this._isCubeOnScene = false;
  }
}

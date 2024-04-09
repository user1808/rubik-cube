import * as THREE from 'three';
import type { RubikCubeFace } from './RubikCubeFace';
import type { RubikCubePieceWrapper } from './RubikCubePiece/RubikCubePieceWrapper';

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
    private readonly _piecesWrappers: Array<RubikCubePieceWrapper>,
  ) {}

  public get faces(): TRubikCubeFaces<FacesNames, RotationTypes> {
    return this._faces;
  }

  public get facesValues(): Record<FacesNames, Array<number>> {
    return Object.fromEntries(
      Object.entries<(typeof this._faces)[keyof typeof this._faces]>(this._faces).map(
        ([key, face]) => [key, face.faceValues],
      ),
    ) as Record<keyof typeof this._faces, Array<number>>;
  }

  public async rotateCubeFace(face: FacesNames, rotationType: RotationTypes): Promise<void> {
    if (this._isRotationPending || !this._isCubeOnScene) return;

    this._isRotationPending = true;
    await this._faces[face].rotate(rotationType);
    this.updateFacesValues();
    this._isRotationPending = false;
  }

  public updateFacesValues(): void {
    Object.values<(typeof this._faces)[keyof typeof this._faces]>(this._faces).forEach((face) => {
      face.updateFaceValues();
    });
  }

  public addToScene(): void {
    this._piecesWrappers.forEach(({ piece }) => this._scene.add(piece));
    this._isCubeOnScene = true;
  }

  public removeFromScene(): void {
    if (this._isRotationPending) return;
    this._piecesWrappers.forEach(({ piece }) => piece.removeFromScene(this._scene));
    this._isCubeOnScene = false;
  }
}

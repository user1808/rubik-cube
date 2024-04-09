import * as THREE from 'three';

type TRubikCubePieceVisibleFaceValue = number;
type TRubikCubePieceVisibleFaceMaterialParameters = Required<
  Pick<THREE.MeshBasicMaterialParameters, 'color'>
> & {
  faceValue: TRubikCubePieceVisibleFaceValue;
};

export class RubikCubePieceVisibleFaceMaterial extends THREE.MeshBasicMaterial {
  private readonly _faceValue: TRubikCubePieceVisibleFaceValue;

  constructor({ color, faceValue }: TRubikCubePieceVisibleFaceMaterialParameters) {
    super({ color });
    this._faceValue = faceValue;
  }

  public get faceValue(): TRubikCubePieceVisibleFaceValue {
    return this._faceValue;
  }
}

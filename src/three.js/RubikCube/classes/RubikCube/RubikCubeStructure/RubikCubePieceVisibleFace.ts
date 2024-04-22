import * as THREE from 'three';
import { RubikCubePieceFace } from './RubikCubePieceFace';

type TRubikCubePieceVisibleFaceValue = number;

export class RubikCubePieceVisibleFace extends RubikCubePieceFace {
  private readonly _value: TRubikCubePieceVisibleFaceValue;

  constructor(
    geometry: THREE.BufferGeometry,
    material: THREE.MeshBasicMaterial,
    value: TRubikCubePieceVisibleFaceValue,
  ) {
    super(geometry, material);
    this._value = value;
  }

  get value(): TRubikCubePieceVisibleFaceValue {
    return this._value;
  }
}

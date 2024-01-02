import * as THREE from 'three';
import type { RubikCubePieceVisibleFaceMaterial } from './RubikCubePieceVisibleFaceMaterial';

export class RubikCubePieceVisibleFace extends THREE.Mesh<
  THREE.BufferGeometry,
  RubikCubePieceVisibleFaceMaterial
> {
  constructor(
    geometry: THREE.BufferGeometry,
    material: RubikCubePieceVisibleFaceMaterial,
    private readonly _normal: THREE.Vector3,
  ) {
    super(geometry, material);
  }

  public get normal(): THREE.Vector3 {
    return this._normal;
  }

  public updateNormal(quaternion: THREE.Quaternion): void {
    this._normal.applyQuaternion(quaternion);
    const { x, y, z } = this._normal;
    this._normal.set(Number(x.toFixed(2)), Number(y.toFixed(2)), Number(z.toFixed(2)));
  }
}

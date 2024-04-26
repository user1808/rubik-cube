import * as THREE from 'three';
import type { RubikCubePiece } from './RubikCubePiece/RubikCubePiece';
import type { RubikCubeFace } from './RubikCubeFace';

export abstract class RubikCube<CubeFacesNames extends string, RotationTypes extends string> {
  constructor(
    private readonly _pieces: Array<RubikCubePiece>,
    private readonly _faces: Record<CubeFacesNames, RubikCubeFace<RotationTypes>>,
  ) {}

  public rotateFace(face: CubeFacesNames, rotationType: RotationTypes) {
    this._faces[face].rotate(rotationType);
  }

  public addToScene(scene: THREE.Scene): void {
    this._pieces.forEach((piece) => scene.add(piece));
  }

  public removeFromScene(scene: THREE.Scene) {
    this._pieces.forEach((piece) => {
      piece.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.BufferGeometry &&
          child.material instanceof THREE.MeshBasicMaterial
        ) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      scene.remove(piece);
    });
  }
}

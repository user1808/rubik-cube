import * as THREE from 'three';
import type { RubikCubePieceVisibleFace } from './RubikCubePieceVisibleFace';

export type TRubikCubePieceBasicData = Pick<THREE.Object3D, 'id' | 'position'>;
export type TRubikCubePieceId = number;
export type TRubikCubePieceOtherFace = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;

export class RubikCubePiece {
  private readonly _pieceGroup: THREE.Group = new THREE.Group();

  constructor(
    private readonly _pieceId: TRubikCubePieceId,
    private readonly _visibleFaces: Array<RubikCubePieceVisibleFace>,
    private readonly _otherFaces: Array<TRubikCubePieceOtherFace>,
  ) {
    this._pieceGroup.add(...[..._visibleFaces, ..._otherFaces]);
  }

  public get visibleFaces(): Array<RubikCubePieceVisibleFace> {
    return this._visibleFaces;
  }

  public setPosition(position: THREE.Vector3): void {
    this._pieceGroup.position.set(
      Number(position.x.toFixed(2)),
      Number(position.y.toFixed(2)),
      Number(position.z.toFixed(2)),
    );
  }

  public rotate(quaternion: THREE.Quaternion): void {
    this._visibleFaces.forEach((face) => face.updateNormal(quaternion));
  }

  public addToFace(groupFace: THREE.Group): void {
    groupFace.add(this._pieceGroup);
  }

  public addToScene(scene: THREE.Scene): void {
    scene.add(this._pieceGroup);
  }

  public removeFromScene(scene: THREE.Scene): void {
    this._pieceGroup.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.BufferGeometry &&
        child.material instanceof THREE.MeshBasicMaterial
      ) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    scene.remove(this._pieceGroup);
  }
}

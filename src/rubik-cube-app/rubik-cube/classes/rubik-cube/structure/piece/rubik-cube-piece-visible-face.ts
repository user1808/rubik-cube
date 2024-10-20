import * as THREE from 'three';
import { RubikCubePieceFace } from './rubik-cube-piece-face';

type TRubikCubePieceVisibleFaceConstructorParams = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  color: number;
};

/**
 * Class for the RubikCubePieceVisibleFace class. Extends the RubikCubePieceFace class.
 * Represents a visible face of a Rubik's Cube piece.
 */
export class RubikCubePieceVisibleFace extends RubikCubePieceFace {
  public readonly color: number;

  private readonly normal: THREE.Vector3;

  constructor(params: TRubikCubePieceVisibleFaceConstructorParams) {
    super(params);
    this.color = params.color;
    this.normal = new THREE.Vector3().fromBufferAttribute(this.geometry.attributes.normal, 0);
    this.roundNormal();
  }

  public getNormal(): THREE.Vector3 {
    return this.normal.clone();
  }

  public applyQuaternionToNormal(quaternion: THREE.Quaternion): void {
    this.normal.applyQuaternion(quaternion).normalize();
    this.roundNormal();
  }

  private roundNormal(): void {
    this.normal.x = parseFloat(this.normal.x.toFixed(4));
    this.normal.y = parseFloat(this.normal.y.toFixed(4));
    this.normal.z = parseFloat(this.normal.z.toFixed(4));
  }
}

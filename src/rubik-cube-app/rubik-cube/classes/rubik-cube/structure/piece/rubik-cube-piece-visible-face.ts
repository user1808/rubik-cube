import * as THREE from 'three';
import { RubikCubePieceFace } from './rubik-cube-piece-face';

type TRubikCubePieceVisibleFaceConstructorParams<TCubeFacesNames extends string> = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  color: number;
  cubeFacesNormalVectors: Record<TCubeFacesNames, THREE.Vector3>;
};

/**
 * Class for the RubikCubePieceVisibleFace class. Extends the RubikCubePieceFace class.
 * Represents a visible face of a Rubik's Cube piece.
 */
export class RubikCubePieceVisibleFace<TCubeFacesNames extends string> extends RubikCubePieceFace {
  public readonly color: number;

  private readonly normal: THREE.Vector3;
  private readonly cubeFacesNormalVectors: Record<TCubeFacesNames, THREE.Vector3>;
  private cubeFace: Nullable<TCubeFacesNames> = null;

  constructor(params: TRubikCubePieceVisibleFaceConstructorParams<TCubeFacesNames>) {
    super(params);
    this.color = params.color;
    this.cubeFacesNormalVectors = params.cubeFacesNormalVectors;
    this.normal = new THREE.Vector3()
      .fromBufferAttribute(this.geometry.attributes.normal, 0)
      .normalize();
    this.roundNormal();
    this.setCubeFace();
  }

  public getNormal(): THREE.Vector3 {
    return this.normal.clone();
  }

  public getCubeFace(): Nullable<TCubeFacesNames> {
    return this.cubeFace;
  }

  public applyQuaternionToNormal(quaternion: THREE.Quaternion): void {
    const originalNormal = this.normal.clone();

    this.normal.applyQuaternion(quaternion).normalize();
    this.roundNormal();

    const difference = originalNormal.distanceTo(this.normal);

    // TODO: move threshold to cube data
    const threshold = 0.01;

    if (difference > threshold) {
      this.setCubeFace();
    }
  }

  private roundNormal(): void {
    this.normal.x = parseFloat(this.normal.x.toFixed(4));
    this.normal.y = parseFloat(this.normal.y.toFixed(4));
    this.normal.z = parseFloat(this.normal.z.toFixed(4));
  }

  private setCubeFace(): void {
    let maxDot = -Infinity;
    let bestMatch: Nullable<TCubeFacesNames> = null;

    for (const faceName in this.cubeFacesNormalVectors) {
      if (Object.prototype.hasOwnProperty.call(this.cubeFacesNormalVectors, faceName)) {
        const faceNormal = this.cubeFacesNormalVectors[faceName];
        const dotProduct = this.normal.dot(faceNormal);

        if (dotProduct > maxDot) {
          maxDot = dotProduct;
          bestMatch = faceName as TCubeFacesNames;
        }
      }
    }

    this.cubeFace = bestMatch;
  }
}

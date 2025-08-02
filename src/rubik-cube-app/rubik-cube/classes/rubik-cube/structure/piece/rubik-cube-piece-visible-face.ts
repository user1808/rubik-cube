import type { BufferGeometry, MeshBasicMaterial, Quaternion } from 'three';
import { Vector3 } from 'three';
import { RubikCubePieceFace } from './rubik-cube-piece-face';
import type {
  TCubeFaceColor,
  TCubeFaceMaterial,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

type TRubikCubePieceVisibleFaceConstructorParams<TCubeFacesNames extends string> = {
  geometry: BufferGeometry;
  material: MeshBasicMaterial;
  color: number;
  cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>;
  pieceCubeFacesColors: Record<TCubeFacesNames, Nullable<number>>;
};

/**
 * Class for the RubikCubePieceVisibleFace class. Extends the RubikCubePieceFace class.
 * Represents a visible face of a Rubik's Cube piece.
 */
export class RubikCubePieceVisibleFace<TCubeFacesNames extends string> extends RubikCubePieceFace {
  private color: TCubeFaceColor;

  private readonly normal: Vector3;
  private readonly cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>;
  private readonly pieceCubeFacesColors: Record<TCubeFacesNames, Nullable<TCubeFaceColor>>;

  constructor(params: TRubikCubePieceVisibleFaceConstructorParams<TCubeFacesNames>) {
    super(params);
    this.color = params.color;
    this.cubeFacesNormalVectors = params.cubeFacesNormalVectors;
    this.pieceCubeFacesColors = params.pieceCubeFacesColors;
    this.normal = new Vector3().fromBufferAttribute(this.geometry.attributes.normal, 0).normalize();
    this.roundNormal();
    this.setCubeFace();
  }

  public updateColor(cubeFaceMaterial: TCubeFaceMaterial): void {
    this.material = cubeFaceMaterial.material;
    this.color = cubeFaceMaterial.color;
    this.setCubeFace();
  }

  public getColor(): TCubeFaceColor {
    return this.color;
  }

  public getNormal(): Vector3 {
    return this.normal.clone();
  }

  public applyQuaternionToNormal(quaternion: Quaternion): void {
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

    if (!bestMatch) return;
    this.pieceCubeFacesColors[bestMatch] = this.color;
  }
}

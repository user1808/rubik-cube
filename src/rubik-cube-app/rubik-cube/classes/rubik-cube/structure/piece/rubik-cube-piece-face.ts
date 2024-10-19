import * as THREE from 'three';
import type { IRubikCubePieceFace } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

type TRubikCubePieceFaceConstructorParams = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  color: number;
};

/**
 * Class for the RubikCubePieceFace class. Extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class, because it implements the IRubikCubePieceFace interface, which extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class.
 */
export class RubikCubePieceFace
  extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  implements IRubikCubePieceFace
{
  private readonly color: number;

  constructor(params: TRubikCubePieceFaceConstructorParams) {
    super(params.geometry, params.material);
    this.color = params.color;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }

  public getColor(): number {
    return this.color;
  }
}

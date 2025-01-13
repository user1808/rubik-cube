import type { BufferGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import type { IRubikCubePieceFace } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

type TRubikCubePieceFaceConstructorParams = {
  geometry: BufferGeometry;
  material: MeshBasicMaterial;
};

/**
 * Class for the RubikCubePieceFace class. Extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class, because it implements the IRubikCubePieceFace interface, which extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class.
 * Represents a face of a Rubik's Cube piece.
 */
export class RubikCubePieceFace
  extends Mesh<BufferGeometry, MeshBasicMaterial>
  implements IRubikCubePieceFace
{
  constructor(params: TRubikCubePieceFaceConstructorParams) {
    super(params.geometry, params.material);
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

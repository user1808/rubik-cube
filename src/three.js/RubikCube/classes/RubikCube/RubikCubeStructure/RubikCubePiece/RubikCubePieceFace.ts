import * as THREE from 'three';

type TRubikCubePieceFaceConstructorParams = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
};

export class RubikCubePieceFace extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  constructor(params: TRubikCubePieceFaceConstructorParams) {
    super(params.geometry, params.material);
  }
}

import * as THREE from 'three';

export class RubikCubePieceFace extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  constructor(geometry: THREE.BufferGeometry, material: THREE.MeshBasicMaterial) {
    super(geometry, material);
  }
}

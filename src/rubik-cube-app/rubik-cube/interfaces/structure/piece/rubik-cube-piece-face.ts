import * as THREE from 'three';

export interface IRubikCubePieceFace
  extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  dispose(): void;
}

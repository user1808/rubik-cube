import * as THREE from 'three';

export interface IRubikCubeMaterials<TCubeFaces extends string> {
  get cubeFacesMaterials(): Record<TCubeFaces, THREE.MeshBasicMaterial>;
}

import * as THREE from 'three';

export interface IRubikCubeMaterials<TCubeFaces extends string, TCubeEdgeFaces extends string> {
  get cubeFacesMaterials(): Record<TCubeFaces, THREE.MeshBasicMaterial>;
  get cubeEdgeFacesMaterials(): Record<TCubeEdgeFaces, THREE.MeshBasicMaterial>;
  get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial;
}

import * as THREE from 'three';

export interface IRubikCubeMaterials<TCubeFaces extends string, TCubeEdgeFaces extends string> {
  readonly cubeFacesMaterials: Record<TCubeFaces, THREE.MeshBasicMaterial>;
  readonly cubeEdgeFacesMaterials: Record<TCubeEdgeFaces, THREE.MeshBasicMaterial>;
  readonly cubeInvisibleFacesMaterials: THREE.MeshBasicMaterial;
}

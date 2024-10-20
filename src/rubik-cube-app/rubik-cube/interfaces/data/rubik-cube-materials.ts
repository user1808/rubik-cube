import * as THREE from 'three';
import type { TCubeFaceMaterial } from '../../types/rubik-cube';

export interface IRubikCubeMaterials<TCubeFaces extends string, TCubeEdgeFaces extends string> {
  readonly cubeFacesMaterials: Record<TCubeFaces, TCubeFaceMaterial>;
  readonly cubeEdgeFacesMaterials: Record<TCubeEdgeFaces, THREE.MeshBasicMaterial>;
  readonly cubeInvisibleFacesMaterials: THREE.MeshBasicMaterial;
}

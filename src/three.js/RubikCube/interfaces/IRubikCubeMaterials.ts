import * as THREE from 'three';

export interface IRubikCubeMaterials<FaceNames extends string, PieceCoverFaceName extends string> {
  get faceMaterials(): Record<FaceNames | PieceCoverFaceName, THREE.MeshBasicMaterial>;
  get invisiblePartsMaterial(): THREE.MeshBasicMaterial;
}

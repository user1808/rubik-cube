import * as THREE from 'three';
import type { TRubikCubeFaceMaterial } from '../types/common/TRubikCubeMaterial';

export interface IRubikCubeMaterials<FaceNames extends string, PieceCoverFaceName extends string> {
  get faceMaterials(): Record<FaceNames | PieceCoverFaceName, TRubikCubeFaceMaterial>;
  get invisiblePartsMaterial(): THREE.MeshBasicMaterial;
}

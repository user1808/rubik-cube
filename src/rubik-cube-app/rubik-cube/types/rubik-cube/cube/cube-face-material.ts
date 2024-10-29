import * as THREE from 'three';
import type { TCubeFaceColor } from './cube-face-color';

export type TCubeFaceMaterial = {
  material: THREE.MeshBasicMaterial;
  color: TCubeFaceColor;
};

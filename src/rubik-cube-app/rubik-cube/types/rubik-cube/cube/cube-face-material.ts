import type { MeshBasicMaterial } from 'three';
import type { TCubeFaceColor } from './cube-face-color';

export type TCubeFaceMaterial = {
  material: MeshBasicMaterial;
  color: TCubeFaceColor;
};

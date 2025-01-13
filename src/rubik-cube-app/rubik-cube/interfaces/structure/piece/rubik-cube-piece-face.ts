import type { BufferGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';

export interface IRubikCubePieceFace extends Mesh<BufferGeometry, MeshBasicMaterial> {
  dispose(): void;
}

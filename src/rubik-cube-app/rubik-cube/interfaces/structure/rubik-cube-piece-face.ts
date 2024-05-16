import * as THREE from 'three';

/**
 * Interface for the RubikCubePieceFace class. Extends the THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> class.
 */
export interface IRubikCubePieceFace
  extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  /**
   * Dispose method for the RubikCubePieceFace class.
   */
  dispose(): void;
}

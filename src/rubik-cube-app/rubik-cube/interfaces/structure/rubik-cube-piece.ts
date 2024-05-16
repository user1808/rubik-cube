import * as THREE from 'three';
import type { IRubikCubePieceFace } from './rubik-cube-piece-face';

/**
 * Interface for the RubikCubePiece class. Extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>.
 */
export interface IRubikCubePiece extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  /**
   * Get method for the pieceId property.
   */
  get pieceId(): number;
  /**
   * Get method for the pieceFaces property.
   */
  get pieceFaces(): Array<IRubikCubePieceFace>;
  /**
   * Dispose method for the RubikCubePiece class.
   */
  dispose(): void;
}

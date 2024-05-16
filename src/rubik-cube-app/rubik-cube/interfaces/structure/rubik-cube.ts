import * as THREE from 'three';
import type { IRubikCubePiece } from './rubik-cube-piece';

/**
 * Interface for the RubikCube class. Extends THREE.Group.
 */
export interface IRubikCube extends THREE.Group {
  /**
   * Get method for the cubePieces property.
   */
  get cubePieces(): Array<IRubikCubePiece>;
  /**
   * Dispose method for the RubikCube class.
   */
  dispose(): void;
}

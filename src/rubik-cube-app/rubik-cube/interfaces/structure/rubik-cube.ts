import * as THREE from 'three';
import type { IRubikCubeRotationData } from '../rubik-cube-rotation-data';
import type { IRubikCubePieceWrapper } from './rubik-cube-piece-wrapper';
import type { IRubikCubeRotationImplementation } from '../rubik-cube-rotation-implementation';

/**
 * Alias for the Rubik's Cube. It is universal to any Rubik's Cube.
 */
export type TUniversalRubikCube = IRubikCube<string, string>;

/**
 * Interface for the RubikCube class. Extends THREE.Group.
 * @template TCubeRotationGroups The type of the cube rotation groups.
 * They could be the same as the cube faces, or they could be different.
 */
export interface IRubikCube<TCubeRotationGroups extends string, TCubeRotationTypes extends string>
  extends THREE.Group {
  /**
   * Get method for the cubePieces property.
   */
  get cubePieces(): Array<IRubikCubePieceWrapper>;
  /**
   * Get method for the cubeRotationGroups property.
   * This record object contains arrays of RubikCubePiece objects that are part of the same rotation group.
   * All arrays should follow some pattern, to help rotate the pieces in the correct order.
   */
  get cubeRotationGroups(): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>;
  /**
   * Rotate method for the RubikCube class.
   * It rotates the cube pieces in the specified rotation group, in the specified rotation type.
   * @param rotationGroup The rotation group to rotate.
   * @param rotationType The rotation type.
   */
  get cubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;

  get rotationPending(): boolean;

  get cubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes
  >;

  rotate(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    scene: THREE.Scene,
  ): Promise<void>;
  /**
   * Dispose method for the RubikCube class.
   */
  dispose(): void;
}

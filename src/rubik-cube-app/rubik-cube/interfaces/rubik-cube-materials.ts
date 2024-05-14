import * as THREE from 'three';
/**
 * Represents the materials of the Rubik's Cube.
 * @template TCubeFaces The type of the faces of the cube.
 * @example
 * type TRubikCubeFaces = 'Front' | 'Back' | 'Left' | 'Right' | 'Top' | 'Bottom';
 *
 * @template TCubeEdgeFaces The type of the faces of the cube's edges.
 * @example
 * type TRubikCubeEdgeFaces = 'EdgeFace';
 */
export interface IRubikCubeMaterials<TCubeFaces extends string, TCubeEdgeFaces extends string> {
  /**
   * The materials of the cube faces.
   */
  get cubeFacesMaterials(): Record<TCubeFaces, THREE.MeshBasicMaterial>;
  /**
   * The materials of the cube edge faces.
   */
  get cubeEdgeFacesMaterials(): Record<TCubeEdgeFaces, THREE.MeshBasicMaterial>;
  /**
   * The material of the cube invisible faces.
   */
  get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial;
}

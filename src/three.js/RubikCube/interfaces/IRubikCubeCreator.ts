import * as THREE from 'three';
import type { IRubikCube } from './IRubikCube';
import type { IRubikCubeData } from './IRubikCubeData';
import type { IRubikCubeMaterials } from './IRubikCubeMaterials';

export interface IRubikCubeCreator<FaceNames extends string, PieceCoverFaceName extends string> {
  createRubikCube(
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<FaceNames, PieceCoverFaceName>,
    cubeData: IRubikCubeData<FaceNames>,
  ): IRubikCube<FaceNames>;
}

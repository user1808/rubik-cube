import * as THREE from 'three';
import type { RubikCubePieceVisibleFaceMaterial } from '../classes/RubikCube/RubikCubeStructure/RubikCubePiece/RubikCubePieceVisibleFaceMaterial';

export interface IRubikCubeMaterials<
  RealFacesNames extends string,
  PieceCoverFacesNames extends string,
> {
  get pieceVisibleFacesMaterials(): Record<RealFacesNames, RubikCubePieceVisibleFaceMaterial>;
  get pieceCoverFacesMaterials(): Record<PieceCoverFacesNames, THREE.MeshBasicMaterial>;
  get pieceInvisibleFacesMaterial(): THREE.MeshBasicMaterial;
}

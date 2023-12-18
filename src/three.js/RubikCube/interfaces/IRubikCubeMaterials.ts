import * as THREE from 'three';
import type { TRubikCubeFacePieceValue } from '../types/common/RubikCubeFaces.types';

export type TRubikCubeFaceMaterial = {
  material: THREE.MeshBasicMaterial;
  value: TRubikCubeFacePieceValue;
};

export interface IRubikCubeMaterials<
  RealFacesNames extends string,
  PieceCoverFacesNames extends string,
> {
  get realFacesMaterials(): Record<RealFacesNames, TRubikCubeFaceMaterial>;
  get pieceCoverFacesMaterials(): Record<PieceCoverFacesNames, THREE.MeshBasicMaterial>;
  get invisiblePartsMaterial(): THREE.MeshBasicMaterial;
}

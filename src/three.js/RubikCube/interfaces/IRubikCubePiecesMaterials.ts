import * as THREE from 'three';

export interface IRubikCubePieceMaterials<
  PieceFacesNames extends string,
  PieceEdgeFacesNames extends string,
> {
  get pieceVisibleFacesMaterials(): Record<PieceFacesNames, THREE.MeshBasicMaterial>;
  get pieceEdgeFacesMaterials(): Record<PieceEdgeFacesNames, THREE.MeshBasicMaterial>;
  get pieceHiddenFacesMaterial(): THREE.MeshBasicMaterial;
}

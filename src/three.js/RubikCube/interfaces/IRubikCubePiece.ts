import * as THREE from 'three';

export interface IRubikCubePiece<FaceNames extends string, CoverFaceName extends string> {
  get faces(): Map<
    FaceNames | CoverFaceName,
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  >;
  get entirePiece(): THREE.Group;
  get id(): number;
}

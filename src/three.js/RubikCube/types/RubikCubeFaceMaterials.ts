import * as THREE from 'three';

export type TRubikCubeFaceMaterials<FaceNames extends string> = Record<
  FaceNames,
  THREE.MeshBasicMaterial
>;

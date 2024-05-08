import * as THREE from 'three';

export type TPieceData<TPiecesFilenames extends string> = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  filename: TPiecesFilenames;
};

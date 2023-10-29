import * as THREE from 'three';

export interface IRubikCubePiece {
  get entirePiece(): THREE.Group;
  get id(): number;
}

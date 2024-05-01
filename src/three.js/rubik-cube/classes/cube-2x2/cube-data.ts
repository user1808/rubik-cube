import * as THREE from 'three';
import type { IRubikCubeData } from '../../interfaces/rubik-cube-data';
import type { TPieceData } from '../../types/rubik-cube/piece-data';

export class RubikCube2x2Data implements IRubikCubeData {
  get piecesData(): Array<TPieceData> {
    return [
      {
        id: 0,
        position: new THREE.Vector3(-0.5, 0.5, 0.5),
      },
      {
        id: 1,
        position: new THREE.Vector3(0.5, 0.5, 0.5),
      },
      {
        id: 2,
        position: new THREE.Vector3(-0.5, -0.5, 0.5),
      },
      {
        id: 3,
        position: new THREE.Vector3(0.5, -0.5, 0.5),
      },
      {
        id: 4,
        position: new THREE.Vector3(-0.5, 0.5, -0.5),
      },
      {
        id: 5,
        position: new THREE.Vector3(0.5, 0.5, -0.5),
      },
      {
        id: 6,
        position: new THREE.Vector3(-0.5, -0.5, -0.5),
      },
      {
        id: 7,
        position: new THREE.Vector3(0.5, -0.5, -0.5),
      },
    ];
  }
}

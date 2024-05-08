import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { TTetrahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/filenames';
import { Radians } from '@/utils/radians';

export class RubikTetrahedronPiecesData implements IRubikCubePiecesData<TTetrahedronFilenames> {
  private readonly _piecesData: typeof this.piecesData = [
    {
      id: 0,
      position: new THREE.Vector3(0, 1.66, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 1,
      position: new THREE.Vector3(0, 0.66, 0),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
    },
    {
      id: 2,
      position: new THREE.Vector3(-0.47, 0.33, 0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 3,
      position: new THREE.Vector3(0.94, 0.33, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 4,
      position: new THREE.Vector3(-0.471, 0.33, -0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 5,
      position: new THREE.Vector3(-0.471, -0.66, 0.815),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
    },
    {
      id: 6,
      position: new THREE.Vector3(0.941, -0.66, 0),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
    },
    {
      id: 7,
      position: new THREE.Vector3(-0.471, -0.66, -0.815),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
    },
    {
      id: 8,
      position: new THREE.Vector3(-0.941, -0.99, 1.63),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 9,
      position: new THREE.Vector3(0.471, -0.99, 0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 10,
      position: new THREE.Vector3(1.882, -0.99, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 11,
      position: new THREE.Vector3(0.471, -0.99, -0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 12,
      position: new THREE.Vector3(-0.941, -0.99, -1.63),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
    {
      id: 13,
      position: new THREE.Vector3(-0.941, -0.99, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
    },
  ];

  public get piecesFilenames(): Array<TTetrahedronFilenames> {
    return ['RubikTetrahedronPiece.glb', 'RubikOctahedronPiece.glb'];
  }

  public get piecesData(): Array<TPieceData<TTetrahedronFilenames>> {
    return this._piecesData;
  }
}

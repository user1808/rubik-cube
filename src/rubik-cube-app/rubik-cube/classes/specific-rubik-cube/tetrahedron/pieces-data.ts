import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import { Radians } from '@/utils/radians';
import type {
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronPiecesFilenames,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/pieces-faces';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';

export class RubikTetrahedronPiecesData
  implements IRubikCubePiecesData<TTetrahedronPiecesFilenamesWithFaces, TTetrahedronFaces>
{
  private readonly _piecesData: typeof this.piecesData = [
    {
      id: 0,
      position: new THREE.Vector3(0, 1.66, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
        FaceC: 'Left',
      },
    },
    {
      id: 1,
      position: new THREE.Vector3(0, 0.66, 0),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceG: 'Left',
      },
    },
    {
      id: 2,
      position: new THREE.Vector3(-0.47, 0.33, 0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceC: 'Left',
      },
    },
    {
      id: 3,
      position: new THREE.Vector3(0.94, 0.33, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
      },
    },
    {
      id: 4,
      position: new THREE.Vector3(-0.471, 0.33, -0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceC: 'Left',
      },
    },
    {
      id: 5,
      position: new THREE.Vector3(-0.471, -0.66, 0.815),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceD: 'Front',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 6,
      position: new THREE.Vector3(0.941, -0.66, 0),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceE: 'Down',
      },
    },
    {
      id: 7,
      position: new THREE.Vector3(-0.471, -0.66, -0.815),
      rotation: new THREE.Euler(Radians['45deg'], Radians['60deg'], Radians['35deg']),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 8,
      position: new THREE.Vector3(-0.941, -0.99, 1.63),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
    {
      id: 9,
      position: new THREE.Vector3(0.471, -0.99, 0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceD: 'Down',
      },
    },
    {
      id: 10,
      position: new THREE.Vector3(1.882, -0.99, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
        FaceD: 'Down',
      },
    },
    {
      id: 11,
      position: new THREE.Vector3(0.471, -0.99, -0.815),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Down',
      },
    },
    {
      id: 12,
      position: new THREE.Vector3(-0.941, -0.99, -1.63),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
    {
      id: 13,
      position: new THREE.Vector3(-0.941, -0.99, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
  ];

  public get piecesFilenames(): Array<TTetrahedronPiecesFilenames> {
    return ['RubikTetrahedronPiece.glb', 'RubikOctahedronPiece.glb'];
  }

  public get piecesData(): Array<TPieceData<TTetrahedronPiecesFilenamesWithFaces, TTetrahedronFaces>> {
    return this._piecesData;
  }
}

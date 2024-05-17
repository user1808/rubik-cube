import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type {
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronPiecesFilenames,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/pieces-faces';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import type { TTetrahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/rotation-groups';

export class RubikTetrahedronPiecesData
  implements
    IRubikCubePiecesData<
      TTetrahedronPiecesFilenamesWithFaces,
      TTetrahedronFaces,
      TTetrahedronRotationGroups
    >
{
  private readonly _piecesIdxsForRotationGroups: typeof this.piecesIdxsForRotationGroups = {
    Front: [0, 1, 3, 10, 6, 9, 8, 5, 2],
    Right: [0, 1, 4, 12, 7, 11, 10, 6, 3],
    Left: [0, 1, 2, 8, 5, 13, 12, 7, 4],
    Down: [8, 5, 9, 10, 6, 11, 12, 7, 13],
    RightCorner: [10],
    LeftCorner: [8],
    BackCorner: [12],
    UpCorner: [0],
    RightMidLayer: [3, 11, 9, 6],
    LeftMidLayer: [2, 9, 13, 5],
    BackMidLayer: [4, 13, 11, 7],
    UpMidLayer: [2, 4, 3, 1],
  };
  private readonly _piecesData: typeof this.piecesData = [
    {
      id: 0,
      position: new THREE.Vector3(0, 1.99712, 0),
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
      position: new THREE.Vector3(0, 0.999245, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceG: 'Left',
      },
    },
    {
      id: 2,
      position: new THREE.Vector3(-0.470434, 0.666966, 0.814357),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceC: 'Left',
      },
    },
    {
      id: 3,
      position: new THREE.Vector3(0.940249, 0.667194, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
      },
    },
    {
      id: 4,
      position: new THREE.Vector3(-0.470882, 0.665698, -0.815522),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceC: 'Left',
      },
    },
    {
      id: 5,
      position: new THREE.Vector3(-0.47008, -0.331997, 0.814378),
      rotation: new THREE.Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceD: 'Front',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 6,
      position: new THREE.Vector3(0.941284, -0.331883, 0),
      rotation: new THREE.Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceE: 'Down',
      },
    },
    {
      id: 7,
      position: new THREE.Vector3(-0.470611, -0.332631, -0.815633),
      rotation: new THREE.Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 8,
      position: new THREE.Vector3(-0.940715, -0.665078, 1.62973),
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
      position: new THREE.Vector3(0.471911, -0.665021, 0.814124),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceD: 'Down',
      },
    },
    {
      id: 10,
      position: new THREE.Vector3(1.88255, -0.664964, 0),
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
      position: new THREE.Vector3(0.470415, -0.665338, -0.815621),
      rotation: new THREE.Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Down',
      },
    },
    {
      id: 12,
      position: new THREE.Vector3(-0.9414, -0.665712, -1.63052),
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
      position: new THREE.Vector3(-0.940827, -0.665395, 0),
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

  public get piecesData(): Array<
    TPieceData<TTetrahedronPiecesFilenamesWithFaces, TTetrahedronFaces>
  > {
    return this._piecesData;
  }

  public get piecesIdxsForRotationGroups(): Record<TTetrahedronRotationGroups, Array<number>> {
    return this._piecesIdxsForRotationGroups;
  }
}

import { Vector3, Euler } from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronFaces,
  TTetrahedronPiecesFilenames,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronPiecesData
  implements IRubikCubePiecesData<TTetrahedronPiecesFilenamesWithFaces, TTetrahedronFaces>
{
  public readonly piecesFilenames: Array<TTetrahedronPiecesFilenames> = [
    'RubikTetrahedronPiece.glb',
    'RubikOctahedronPiece.glb',
  ];

  public readonly facesNormalVectors: Record<TTetrahedronFaces, Vector3> = {
    Front: new Vector3(0.471, 0.333, 0.8165),
    Right: new Vector3(0.471, 0.333, -0.8165),
    Left: new Vector3(-0.943, 0.333, 0),
    Down: new Vector3(0, -1, 0),
  };

  public readonly piecesInitData: Array<
    TPieceData<TTetrahedronPiecesFilenamesWithFaces, TTetrahedronFaces>
  > = [
    {
      id: 0,
      position: new Vector3(0, 1.99712, 0),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
        FaceC: 'Left',
      },
    },
    {
      id: 1,
      position: new Vector3(0, 0.999245, 0),
      rotation: new Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceG: 'Left',
      },
    },
    {
      id: 2,
      position: new Vector3(-0.470434, 0.666966, 0.814357),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceC: 'Left',
      },
    },
    {
      id: 3,
      position: new Vector3(0.940249, 0.667194, 0),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
      },
    },
    {
      id: 4,
      position: new Vector3(-0.470882, 0.665698, -0.815522),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceC: 'Left',
      },
    },
    {
      id: 5,
      position: new Vector3(-0.47008, -0.331997, 0.814378),
      rotation: new Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceD: 'Front',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 6,
      position: new Vector3(0.941284, -0.331883, 0),
      rotation: new Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Front',
        FaceE: 'Down',
      },
    },
    {
      id: 7,
      position: new Vector3(-0.470611, -0.332631, -0.815633),
      rotation: new Euler(),
      filename: 'RubikOctahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceE: 'Down',
        FaceG: 'Left',
      },
    },
    {
      id: 8,
      position: new Vector3(-0.940715, -0.665078, 1.62973),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
    {
      id: 9,
      position: new Vector3(0.471911, -0.665021, 0.814124),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceD: 'Down',
      },
    },
    {
      id: 10,
      position: new Vector3(1.88255, -0.664964, 0),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceA: 'Front',
        FaceB: 'Right',
        FaceD: 'Down',
      },
    },
    {
      id: 11,
      position: new Vector3(0.470415, -0.665338, -0.815621),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceD: 'Down',
      },
    },
    {
      id: 12,
      position: new Vector3(-0.9414, -0.665712, -1.63052),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceB: 'Right',
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
    {
      id: 13,
      position: new Vector3(-0.940827, -0.665395, 0),
      rotation: new Euler(),
      filename: 'RubikTetrahedronPiece.glb',
      pieceFacesToCubeFaces: {
        FaceC: 'Left',
        FaceD: 'Down',
      },
    },
  ];
}

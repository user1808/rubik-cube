import { MeshBasicMaterial } from 'three';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikDodecahedronMaterials
  implements IRubikCubeMaterials<TDodecahedronFaces, TDodecahedronEdgeFaces>
{
  public readonly cubeFacesMaterials: Record<TDodecahedronFaces, TCubeFaceMaterial> = {
    Up: { material: new MeshBasicMaterial({ color: 0x0062ff }), color: 0 },
    Down: { material: new MeshBasicMaterial({ color: 0x00fbff }), color: 1 },
    Right: { material: new MeshBasicMaterial({ color: 0xff00f2 }), color: 2 },
    BackLeft: { material: new MeshBasicMaterial({ color: 0x7d48b8 }), color: 3 },
    Front: { material: new MeshBasicMaterial({ color: 0xff0000 }), color: 4 },
    Back: { material: new MeshBasicMaterial({ color: 0xff7700 }), color: 5 },
    Left: { material: new MeshBasicMaterial({ color: 0xffffff }), color: 6 },
    BackRight: { material: new MeshBasicMaterial({ color: 0x888888 }), color: 7 },
    UpLeft: { material: new MeshBasicMaterial({ color: 0xfff200 }), color: 8 },
    DownRight: { material: new MeshBasicMaterial({ color: 0xbfff00 }), color: 9 },
    UpRight: { material: new MeshBasicMaterial({ color: 0x7bff00 }), color: 10 },
    DownLeft: { material: new MeshBasicMaterial({ color: 0x00ff8c }), color: 11 },
  };
  public readonly cubeEdgeFacesMaterials: Record<TDodecahedronEdgeFaces, MeshBasicMaterial> = {
    EdgeFace: new MeshBasicMaterial({ color: 0x454545 }),
  };
  public readonly cubeInvisibleFacesMaterials: MeshBasicMaterial = new MeshBasicMaterial({
    color: 0x2b2b2b,
  });
  public readonly initCubeFacesColors: Record<TDodecahedronFaces, null> = {
    Up: null,
    Down: null,
    Right: null,
    BackLeft: null,
    Front: null,
    Back: null,
    Left: null,
    BackRight: null,
    UpLeft: null,
    DownRight: null,
    UpRight: null,
    DownLeft: null,
  };
}

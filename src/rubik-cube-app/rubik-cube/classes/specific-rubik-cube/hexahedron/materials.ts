import { MeshBasicMaterial } from 'three';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikHexahedronMaterials
  implements IRubikCubeMaterials<THexahedronFaces, THexahedronEdgeFaces>
{
  public readonly cubeFacesMaterials: Record<THexahedronFaces, TCubeFaceMaterial> = {
    Front: { material: new MeshBasicMaterial({ color: 0xff0000 }), color: 0 },
    Back: { material: new MeshBasicMaterial({ color: 0xff8800 }), color: 1 },
    Right: { material: new MeshBasicMaterial({ color: 0xffffff }), color: 2 },
    Left: { material: new MeshBasicMaterial({ color: 0xffff00 }), color: 3 },
    Up: { material: new MeshBasicMaterial({ color: 0x00ff00 }), color: 4 },
    Down: { material: new MeshBasicMaterial({ color: 0x0000ff }), color: 5 },
  };
  public readonly cubeEdgeFacesMaterials: Record<THexahedronEdgeFaces, MeshBasicMaterial> = {
    EdgeFace: new MeshBasicMaterial({ color: 0x454545 }),
  };
  public readonly cubeInvisibleFacesMaterials: MeshBasicMaterial = new MeshBasicMaterial({
    color: 0x2b2b2b,
  });
  public readonly initCubeFacesColors: Record<THexahedronFaces, null> = {
    Front: null,
    Back: null,
    Right: null,
    Left: null,
    Up: null,
    Down: null,
  };
}

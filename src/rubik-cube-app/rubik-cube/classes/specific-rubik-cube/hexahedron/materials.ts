import * as THREE from 'three';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikHexahedronMaterials
  implements IRubikCubeMaterials<THexahedronFaces, THexahedronEdgeFaces>
{
  public readonly cubeFacesMaterials: Record<THexahedronFaces, THREE.MeshBasicMaterial> = {
    Front: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Back: new THREE.MeshBasicMaterial({ color: 0xff8800 }),
    Right: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    Left: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    Up: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    Down: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  };
  public readonly cubeEdgeFacesMaterials: Record<THexahedronEdgeFaces, THREE.MeshBasicMaterial> = {
    EdgeFace: new THREE.MeshBasicMaterial({ color: 0x454545 }),
  };
  public readonly cubeInvisibleFacesMaterials: THREE.MeshBasicMaterial =
    new THREE.MeshBasicMaterial({ color: 0x2b2b2b });
}

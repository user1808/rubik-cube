import * as THREE from 'three';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikHexahedronMaterials
  implements IRubikCubeMaterials<THexahedronFaces, THexahedronEdgeFaces>
{
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Front: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Back: new THREE.MeshBasicMaterial({ color: 0xff8800 }),
    Right: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    Left: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    Up: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    Down: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  };
  private readonly _cubeEdgeFacesMaterials: typeof this.cubeEdgeFacesMaterials = {
    EdgeFace: new THREE.MeshBasicMaterial({ color: 0x454545 }),
  };
  private readonly _cubeInvisibleFacesMaterials: typeof this.cubeInvisibleFacesMaterials =
    new THREE.MeshBasicMaterial({ color: 0x2b2b2b });

  public get cubeFacesMaterials(): Record<THexahedronFaces, THREE.MeshBasicMaterial> {
    return this._cubeFacesMaterials;
  }
  public get cubeEdgeFacesMaterials(): Record<THexahedronEdgeFaces, THREE.MeshBasicMaterial> {
    return this._cubeEdgeFacesMaterials;
  }
  public get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial {
    return this._cubeInvisibleFacesMaterials;
  }
}

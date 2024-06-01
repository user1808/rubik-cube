import * as THREE from 'three';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikDodecahedronMaterials
  implements IRubikCubeMaterials<TDodecahedronFaces, TDodecahedronEdgeFaces>
{
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Up: new THREE.MeshBasicMaterial({ color: 0x0062ff }),
    Down: new THREE.MeshBasicMaterial({ color: 0x00fbff }),
    Right: new THREE.MeshBasicMaterial({ color: 0xff00f2 }),
    BackLeft: new THREE.MeshBasicMaterial({ color: 0x7d48b8 }),
    Front: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Back: new THREE.MeshBasicMaterial({ color: 0xff7700 }),
    Left: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    BackRight: new THREE.MeshBasicMaterial({ color: 0x888888 }),
    UpLeft: new THREE.MeshBasicMaterial({ color: 0xfff200 }),
    DownRight: new THREE.MeshBasicMaterial({ color: 0xbfff00 }),
    UpRight: new THREE.MeshBasicMaterial({ color: 0x7bff00 }),
    DownLeft: new THREE.MeshBasicMaterial({ color: 0x00ff8c }),
  };
  private readonly _cubeEdgeFacesMaterials: typeof this.cubeEdgeFacesMaterials = {
    EdgeFace: new THREE.MeshBasicMaterial({ color: 0x454545 }),
  };
  private readonly _cubeInvisibleFacesMaterials: typeof this.cubeInvisibleFacesMaterials =
    new THREE.MeshBasicMaterial({ color: 0x2b2b2b });

  public get cubeFacesMaterials(): Record<TDodecahedronFaces, THREE.MeshBasicMaterial> {
    return this._cubeFacesMaterials;
  }
  public get cubeEdgeFacesMaterials(): Record<TDodecahedronEdgeFaces, THREE.MeshBasicMaterial> {
    return this._cubeEdgeFacesMaterials;
  }
  public get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial {
    return this._cubeInvisibleFacesMaterials;
  }
}

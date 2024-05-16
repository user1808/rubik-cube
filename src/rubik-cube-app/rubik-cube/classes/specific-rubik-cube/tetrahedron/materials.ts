import * as THREE from 'three';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type {
  TTetrahedronEdgeFaces,
  TTetrahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';

export class RubikTetrahedronMaterials
  implements IRubikCubeMaterials<TTetrahedronFaces, TTetrahedronEdgeFaces>
{
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Front: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    Right: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Left: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    Down: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  };
  private readonly _cubeEdgeFacesMaterials: typeof this.cubeEdgeFacesMaterials = {
    EdgeFace: new THREE.MeshBasicMaterial({ color: 0x454545 }),
  };
  private readonly _cubeInvisibleFacesMaterials: typeof this.cubeInvisibleFacesMaterials =
    new THREE.MeshBasicMaterial({ color: 0x2b2b2b });

  public get cubeFacesMaterials(): Record<TTetrahedronFaces, THREE.MeshBasicMaterial> {
    return this._cubeFacesMaterials;
  }
  public get cubeEdgeFacesMaterials(): Record<TTetrahedronEdgeFaces, THREE.MeshBasicMaterial> {
    return this._cubeEdgeFacesMaterials;
  }
  public get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial {
    return this._cubeInvisibleFacesMaterials;
  }
}

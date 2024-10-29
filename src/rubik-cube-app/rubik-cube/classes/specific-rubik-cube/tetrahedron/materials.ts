import * as THREE from 'three';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type {
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikTetrahedronMaterials
  implements IRubikCubeMaterials<TTetrahedronFaces, TTetrahedronEdgeFaces>
{
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Front: { material: new THREE.MeshBasicMaterial({ color: 0x0000ff }), color: 0 },
    Right: { material: new THREE.MeshBasicMaterial({ color: 0xff0000 }), color: 1 },
    Left: { material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }), color: 2 },
    Down: { material: new THREE.MeshBasicMaterial({ color: 0xffff00 }), color: 3 },
  };
  private readonly _cubeEdgeFacesMaterials: typeof this.cubeEdgeFacesMaterials = {
    EdgeFace: new THREE.MeshBasicMaterial({ color: 0x454545 }),
  };
  private readonly _cubeInvisibleFacesMaterials: typeof this.cubeInvisibleFacesMaterials =
    new THREE.MeshBasicMaterial({ color: 0x2b2b2b });
  private readonly _initCubeFacesColors: typeof this.initCubeFacesColors = {
    Front: null,
    Right: null,
    Left: null,
    Down: null,
  };

  public get cubeFacesMaterials(): Record<TTetrahedronFaces, TCubeFaceMaterial> {
    return this._cubeFacesMaterials;
  }
  public get cubeEdgeFacesMaterials(): Record<TTetrahedronEdgeFaces, THREE.MeshBasicMaterial> {
    return this._cubeEdgeFacesMaterials;
  }
  public get cubeInvisibleFacesMaterials(): THREE.MeshBasicMaterial {
    return this._cubeInvisibleFacesMaterials;
  }
  public get initCubeFacesColors(): Record<TTetrahedronFaces, null> {
    return this._initCubeFacesColors;
  }
}

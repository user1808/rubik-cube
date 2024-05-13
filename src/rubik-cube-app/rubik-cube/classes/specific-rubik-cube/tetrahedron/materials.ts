import * as THREE from 'three';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';

export class RubikTetrahedronMaterials implements IRubikCubeMaterials<TTetrahedronFaces> {
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Front: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    Right: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Left: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    Down: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  };

  public get cubeFacesMaterials(): Record<TTetrahedronFaces, THREE.MeshBasicMaterial> {
    return this._cubeFacesMaterials;
  }
}

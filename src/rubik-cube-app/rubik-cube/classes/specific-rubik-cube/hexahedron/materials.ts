import * as THREE from 'three';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedronMaterials implements IRubikCubeMaterials<THexahedronFaces> {
  private readonly _cubeFacesMaterials: typeof this.cubeFacesMaterials = {
    Front: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    Back: new THREE.MeshBasicMaterial({ color: 0xff8800 }),
    Right: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    Left: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    Up: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    Down: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  };

  public get cubeFacesMaterials(): Record<THexahedronFaces, THREE.MeshBasicMaterial> {
    return this._cubeFacesMaterials;
  }
}

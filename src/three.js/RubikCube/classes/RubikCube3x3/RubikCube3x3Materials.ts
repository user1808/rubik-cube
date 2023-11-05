import * as THREE from 'three';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';
import type { TRubikCubeFaceMaterial } from '../../types/common/TRubikCubeMaterial';

export class RubikCube3x3Materials
  implements IRubikCubeMaterials<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
{
  private readonly pseudoFaceMaterial: (typeof this.faceMaterials)[TRubikCube3x3FaceNames] = {
    material: new THREE.MeshBasicMaterial(),
    value: -2,
  };
  private readonly _faceMaterials: typeof this.faceMaterials = {
    Cover: { material: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }), value: -1 },
    TopFace: { material: new THREE.MeshBasicMaterial({ color: 0xff0000 }), value: 0 },
    DownFace: { material: new THREE.MeshBasicMaterial({ color: 0xffa500 }), value: 1 },
    LeftFace: { material: new THREE.MeshBasicMaterial({ color: 0xffff00 }), value: 2 },
    RightFace: { material: new THREE.MeshBasicMaterial({ color: 0xffffff }), value: 3 },
    FrontFace: { material: new THREE.MeshBasicMaterial({ color: 0x0000ff }), value: 4 },
    BackFace: { material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }), value: 5 },
    SliceXFace: this.pseudoFaceMaterial,
    SliceYFace: this.pseudoFaceMaterial,
    SliceZFace: this.pseudoFaceMaterial,
  };
  private readonly _invisiblePartsMaterial: typeof this.invisiblePartsMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x000000,
    });

  public get faceMaterials(): Record<
    TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName,
    TRubikCubeFaceMaterial
  > {
    return this._faceMaterials;
  }
  public get invisiblePartsMaterial(): THREE.MeshBasicMaterial {
    return this._invisiblePartsMaterial;
  }
}

import * as THREE from 'three';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';

export class RubikCube3x3Materials
  implements IRubikCubeMaterials<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
{
  private readonly unusedMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
  private readonly _faceMaterials: typeof this.faceMaterials = {
    Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }),
    TopFace: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    DownFace: new THREE.MeshBasicMaterial({ color: 0xffa500 }),
    LeftFace: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    RightFace: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    FrontFace: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    BackFace: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    SliceXFace: this.unusedMaterial,
    SliceYFace: this.unusedMaterial,
    SliceZFace: this.unusedMaterial,
  };
  private readonly _invisiblePartsMaterial: typeof this.invisiblePartsMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x000000,
    });

  public get faceMaterials(): Record<
    TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName,
    THREE.MeshBasicMaterial
  > {
    return this._faceMaterials;
  }
  public get invisiblePartsMaterial(): THREE.MeshBasicMaterial {
    return this._invisiblePartsMaterial;
  }
}

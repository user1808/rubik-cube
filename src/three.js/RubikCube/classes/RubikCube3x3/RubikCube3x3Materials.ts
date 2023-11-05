import * as THREE from 'three';
import type {
  IRubikCubeMaterials,
  TRubikCubeFaceMaterial,
} from '../../interfaces/IRubikCubeMaterials';
import type { TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3PieceCoversNames } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoversNames';

export class RubikCube3x3Materials
  implements IRubikCubeMaterials<TRubikCube3x3RealFacesNames, TRubikCube3x3PieceCoversNames>
{
  private readonly _realFacesMaterials: typeof this.realFacesMaterials = {
    TopFace: { material: new THREE.MeshBasicMaterial({ color: 0xff0000 }), value: 0 },
    DownFace: { material: new THREE.MeshBasicMaterial({ color: 0xffa500 }), value: 1 },
    LeftFace: { material: new THREE.MeshBasicMaterial({ color: 0xffff00 }), value: 2 },
    RightFace: { material: new THREE.MeshBasicMaterial({ color: 0xffffff }), value: 3 },
    FrontFace: { material: new THREE.MeshBasicMaterial({ color: 0x0000ff }), value: 4 },
    BackFace: { material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }), value: 5 },
  };

  public get realFacesMaterials(): Record<TRubikCube3x3RealFacesNames, TRubikCubeFaceMaterial> {
    return this._realFacesMaterials;
  }

  public get pieceCoverFacesMaterials(): Record<
    TRubikCube3x3PieceCoversNames,
    THREE.MeshBasicMaterial
  > {
    return { Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }) };
  }

  public get invisiblePartsMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({ color: 0x000000 });
  }
}

import * as THREE from 'three';
import type { IRubikCubePieceMaterials } from '../../interfaces/IRubikCubePiecesMaterials';
import type { TRubikCube2x2PieceCoversNames } from '../../types/RubikCube2x2/TRubikCube2x2PieceCoversNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';

export class RubikCube2x2Materials
  implements IRubikCubePieceMaterials<TRubikCube2x2RealFacesNames, TRubikCube2x2PieceCoversNames>
{
  private readonly _realFacesMaterials: typeof this.pieceVisibleFacesMaterials = {
    TopFace: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    DownFace: new THREE.MeshBasicMaterial({ color: 0xffa500 }),
    LeftFace: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    RightFace: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    FrontFace: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    BackFace: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  };
  private readonly _edgeFacesMaterials: typeof this.pieceEdgeFacesMaterials = {
    Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }),
  };
  private readonly _hiddenFacesMaterials: typeof this.pieceHiddenFacesMaterial =
    new THREE.MeshBasicMaterial({ color: 0x000000 });

  public get pieceVisibleFacesMaterials(): Record<
    TRubikCube2x2RealFacesNames,
    THREE.MeshBasicMaterial
  > {
    return this._realFacesMaterials;
  }
  public get pieceEdgeFacesMaterials(): Record<
    TRubikCube2x2PieceCoversNames,
    THREE.MeshBasicMaterial
  > {
    return this._edgeFacesMaterials;
  }
  public get pieceHiddenFacesMaterial(): THREE.MeshBasicMaterial {
    return this._hiddenFacesMaterials;
  }
}

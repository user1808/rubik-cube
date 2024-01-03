import * as THREE from 'three';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { TRubikCube2x2PieceCoversNames } from '../../types/RubikCube2x2/TRubikCube2x2PieceCoversNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import { RubikCubePieceVisibleFaceMaterial } from '../RubikCube/RubikCubeStructure/RubikCubePiece/RubikCubePieceVisibleFaceMaterial';

export class RubikCube2x2Materials
  implements IRubikCubeMaterials<TRubikCube2x2RealFacesNames, TRubikCube2x2PieceCoversNames>
{
  private readonly _realFacesMaterials: typeof this.pieceVisibleFacesMaterials = {
    TopFace: new RubikCubePieceVisibleFaceMaterial({ color: 0xff0000, faceValue: 0 }),
    DownFace: new RubikCubePieceVisibleFaceMaterial({ color: 0xffa500, faceValue: 1 }),
    LeftFace: new RubikCubePieceVisibleFaceMaterial({ color: 0xffff00, faceValue: 2 }),
    RightFace: new RubikCubePieceVisibleFaceMaterial({ color: 0xffffff, faceValue: 3 }),
    FrontFace: new RubikCubePieceVisibleFaceMaterial({ color: 0x0000ff, faceValue: 4 }),
    BackFace: new RubikCubePieceVisibleFaceMaterial({ color: 0x00ff00, faceValue: 5 }),
  };

  public get pieceVisibleFacesMaterials(): Record<
    TRubikCube2x2RealFacesNames,
    RubikCubePieceVisibleFaceMaterial
  > {
    return this._realFacesMaterials;
  }
  public get pieceCoverFacesMaterials(): Record<
    TRubikCube2x2PieceCoversNames,
    THREE.MeshBasicMaterial
  > {
    return { Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }) };
  }
  public get pieceInvisibleFacesMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({ color: 0x000000 });
  }
}

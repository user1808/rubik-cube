import * as THREE from 'three';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3PieceCoversNames } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoversNames';
import { RubikCubePieceVisibleFaceMaterial } from '../RubikCube/RubikCubePiece/RubikCubePieceVisibleFaceMaterial';

export class RubikCube3x3Materials
  implements IRubikCubeMaterials<TRubikCube3x3RealFacesNames, TRubikCube3x3PieceCoversNames>
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
    TRubikCube3x3RealFacesNames,
    RubikCubePieceVisibleFaceMaterial
  > {
    return this._realFacesMaterials;
  }

  public get pieceCoverFacesMaterials(): Record<
    TRubikCube3x3PieceCoversNames,
    THREE.MeshBasicMaterial
  > {
    return { Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }) };
  }

  public get pieceInvisibleFacesMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({ color: 0x000000 });
  }
}

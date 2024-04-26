import * as THREE from 'three';
import type { IRubikCubeData, TRubikCubePieceIdx } from '../../interfaces/IRubikCubeData';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import type { TRubikCubePieceBasicData } from '../RubikCube/CubeStructure/Piece/RubikCubePiece';

export class RubikCube2x2Data
  implements IRubikCubeData<TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames>
{
  private readonly _piecesBasicData: typeof this.piecesBasicData = [
    { pieceId: 0, position: new THREE.Vector3(-0.5, 0.5, -0.5) },
    { pieceId: 1, position: new THREE.Vector3(0.5, 0.5, -0.5) },
    { pieceId: 2, position: new THREE.Vector3(-0.5, 0.5, 0.5) },
    { pieceId: 3, position: new THREE.Vector3(0.5, 0.5, 0.5) },
    { pieceId: 4, position: new THREE.Vector3(-0.5, -0.5, -0.5) },
    { pieceId: 5, position: new THREE.Vector3(0.5, -0.5, -0.5) },
    { pieceId: 6, position: new THREE.Vector3(-0.5, -0.5, 0.5) },
    { pieceId: 7, position: new THREE.Vector3(0.5, -0.5, 0.5) },
  ];

  private readonly _initFacesPiecesIdx: typeof this.initFacesPiecesIdx = {
    TopFace: [0, 1, 2, 3],
    DownFace: [6, 7, 4, 5],
    FrontFace: [2, 3, 6, 7],
    BackFace: [1, 0, 5, 4],
    RightFace: [3, 1, 7, 5],
    LeftFace: [0, 2, 4, 6],
  };

  public get piecesBasicData(): Array<TRubikCubePieceBasicData> {
    return this._piecesBasicData;
  }

  public get initFacesPiecesIdx(): Record<
    TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames,
    Array<TRubikCubePieceIdx>
  > {
    return this._initFacesPiecesIdx;
  }
}

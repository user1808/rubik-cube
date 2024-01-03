import * as THREE from 'three';
import type { IRubikCubeData, TRubikCubePieceIdx } from '../../interfaces/IRubikCubeData';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import type { TRubikCubePieceBasicData } from '../RubikCube/RubikCubeStructure/RubikCubePiece/RubikCubePiece';

export class RubikCube2x2Data
  implements IRubikCubeData<TRubikCube2x2RealFacesNames, TRubikCube2x2PseudoFacesNames>
{
  private readonly _cubeAllPiecesBasicData: typeof this.basicDataOfAllCubePieces = [
    { id: 0, position: new THREE.Vector3(-0.5, 0.5, -0.5) },
    { id: 1, position: new THREE.Vector3(0.5, 0.5, -0.5) },
    { id: 2, position: new THREE.Vector3(-0.5, 0.5, 0.5) },
    { id: 3, position: new THREE.Vector3(0.5, 0.5, 0.5) },
    { id: 4, position: new THREE.Vector3(-0.5, -0.5, -0.5) },
    { id: 5, position: new THREE.Vector3(0.5, -0.5, -0.5) },
    { id: 6, position: new THREE.Vector3(-0.5, -0.5, 0.5) },
    { id: 7, position: new THREE.Vector3(0.5, -0.5, 0.5) },
  ];

  private readonly _cubeAllFacesPiecesInitIds: typeof this.initPiecesIdxsOfAllFaces = {
    TopFace: [0, 1, 2, 3],
    DownFace: [6, 7, 4, 5],
    FrontFace: [2, 3, 6, 7],
    BackFace: [1, 0, 5, 4],
    RightFace: [3, 1, 7, 5],
    LeftFace: [0, 2, 4, 6],
  };

  private readonly _cubeVisiblePiecesFacesInitNormals: typeof this.initNormalsOfRealFaces = {
    TopFace: new THREE.Vector3(0, 1, 0),
    DownFace: new THREE.Vector3(0, -1, 0),
    FrontFace: new THREE.Vector3(0, 0, 1),
    BackFace: new THREE.Vector3(0, 0, -1),
    RightFace: new THREE.Vector3(1, 0, 0),
    LeftFace: new THREE.Vector3(-1, 0, 0),
  };

  public get basicDataOfAllCubePieces(): Array<TRubikCubePieceBasicData> {
    return this._cubeAllPiecesBasicData;
  }

  public get initPiecesIdxsOfAllFaces(): Record<
    TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames,
    Array<TRubikCubePieceIdx>
  > {
    return this._cubeAllFacesPiecesInitIds;
  }

  public get initNormalsOfRealFaces(): Record<TRubikCube2x2RealFacesNames, THREE.Vector3> {
    return this._cubeVisiblePiecesFacesInitNormals;
  }
}

import * as THREE from 'three';
import type { IRubikCubeData, TRubikCubePieceIdx } from '../../interfaces/IRubikCubeData';
import type { TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3PseudoFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import type { TRubikCubePieceBasicData } from '../RubikCube/RubikCubeStructure/RubikCubePiece/RubikCubePiece';

export class RubikCube3x3Data
  implements IRubikCubeData<TRubikCube3x3RealFacesNames, TRubikCube3x3PseudoFacesNames>
{
  private readonly _cubeAllPiecesBasicData: typeof this.basicDataOfAllCubePieces = [
    { id: 0, position: new THREE.Vector3(-1, 1, -1) },
    { id: 1, position: new THREE.Vector3(0, 1, -1) },
    { id: 2, position: new THREE.Vector3(1, 1, -1) },
    { id: 3, position: new THREE.Vector3(-1, 1, 0) },
    { id: 4, position: new THREE.Vector3(0, 1, 0) },
    { id: 5, position: new THREE.Vector3(1, 1, 0) },
    { id: 6, position: new THREE.Vector3(-1, 1, 1) },
    { id: 7, position: new THREE.Vector3(0, 1, 1) },
    { id: 8, position: new THREE.Vector3(1, 1, 1) },
    { id: 9, position: new THREE.Vector3(-1, 0, -1) },
    { id: 10, position: new THREE.Vector3(0, 0, -1) },
    { id: 11, position: new THREE.Vector3(1, 0, -1) },
    { id: 12, position: new THREE.Vector3(-1, 0, 0) },
    { id: 13, position: new THREE.Vector3(0, 0, 0) },
    { id: 14, position: new THREE.Vector3(1, 0, 0) },
    { id: 15, position: new THREE.Vector3(-1, 0, 1) },
    { id: 16, position: new THREE.Vector3(0, 0, 1) },
    { id: 17, position: new THREE.Vector3(1, 0, 1) },
    { id: 18, position: new THREE.Vector3(-1, -1, -1) },
    { id: 19, position: new THREE.Vector3(0, -1, -1) },
    { id: 20, position: new THREE.Vector3(1, -1, -1) },
    { id: 21, position: new THREE.Vector3(-1, -1, 0) },
    { id: 22, position: new THREE.Vector3(0, -1, 0) },
    { id: 23, position: new THREE.Vector3(1, -1, 0) },
    { id: 24, position: new THREE.Vector3(-1, -1, 1) },
    { id: 25, position: new THREE.Vector3(0, -1, 1) },
    { id: 26, position: new THREE.Vector3(1, -1, 1) },
  ];

  private readonly _cubeRealFacesPiecesIds: typeof this.initPiecesIdxsOfAllFaces = {
    TopFace: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    DownFace: [24, 25, 26, 21, 22, 23, 18, 19, 20],
    LeftFace: [0, 3, 6, 9, 12, 15, 18, 21, 24],
    RightFace: [8, 5, 2, 17, 14, 11, 26, 23, 20],
    FrontFace: [6, 7, 8, 15, 16, 17, 24, 25, 26],
    BackFace: [2, 1, 0, 11, 10, 9, 20, 19, 18],
    SliceXFace: [7, 4, 1, 16, 13, 10, 25, 22, 19],
    SliceYFace: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    SliceZFace: [3, 4, 5, 12, 13, 14, 21, 22, 23],
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
    TRubikCube3x3RealFacesNames | TRubikCube3x3PseudoFacesNames,
    Array<TRubikCubePieceIdx>
  > {
    return this._cubeRealFacesPiecesIds;
  }

  public get initNormalsOfRealFaces(): Record<TRubikCube3x3RealFacesNames, THREE.Vector3> {
    return this._cubeVisiblePiecesFacesInitNormals;
  }
}

import * as THREE from 'three';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { TRubikCubeBasicData } from '../../types/RubikCubePieceBasicData';
import type { TRubikCubeCommonFaceNames } from '../../types/RubikCubeCommonFaceNames';

export class RubikCube3x3Data implements IRubikCubeData<TRubikCubeCommonFaceNames> {
  private readonly _piecesBasicData = [
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
    { id: 13, position: new THREE.Vector3(1, 0, 0) },
    { id: 14, position: new THREE.Vector3(-1, 0, 1) },
    { id: 15, position: new THREE.Vector3(0, 0, 1) },
    { id: 16, position: new THREE.Vector3(1, 0, 1) },
    { id: 17, position: new THREE.Vector3(-1, -1, -1) },
    { id: 18, position: new THREE.Vector3(0, -1, -1) },
    { id: 19, position: new THREE.Vector3(1, -1, -1) },
    { id: 20, position: new THREE.Vector3(-1, -1, 0) },
    { id: 21, position: new THREE.Vector3(0, -1, 0) },
    { id: 22, position: new THREE.Vector3(1, -1, 0) },
    { id: 23, position: new THREE.Vector3(-1, -1, 1) },
    { id: 24, position: new THREE.Vector3(0, -1, 1) },
    { id: 25, position: new THREE.Vector3(1, -1, 1) },
  ];
  private readonly _cubeFacePiecesIdxs = {
    TopFace: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    DownFace: [23, 24, 25, 20, 21, 22, 17, 18, 19],
    LeftFace: [0, 3, 6, 9, 12, 14, 17, 20, 23],
    RightFace: [8, 5, 2, 16, 13, 11, 25, 22, 19],
    FrontFace: [6, 7, 8, 14, 15, 16, 23, 24, 25],
    BackFace: [2, 1, 0, 11, 10, 9, 19, 18, 17],
  };

  get cubePiecesBasicData(): TRubikCubeBasicData[] {
    return this._piecesBasicData;
  }
  get cubeFacePiecesIdxs(): Record<TRubikCubeCommonFaceNames, number[]> {
    return this._cubeFacePiecesIdxs;
  }
}

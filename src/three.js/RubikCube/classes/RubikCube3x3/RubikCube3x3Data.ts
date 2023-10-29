import * as THREE from 'three';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { TRubikCubePieceBasicData } from '../../types/common/TRubikCubePieceBasicData';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';

export class RubikCube3x3Data implements IRubikCubeData<TRubikCube3x3FaceNames> {
  private readonly _cubePiecesBasicData: typeof this.cubePiecesBasicData = [
    { id: 0, position: new THREE.Vector3(-1, 1, -1), rotation: new THREE.Euler() },
    { id: 1, position: new THREE.Vector3(0, 1, -1), rotation: new THREE.Euler() },
    { id: 2, position: new THREE.Vector3(1, 1, -1), rotation: new THREE.Euler() },
    { id: 3, position: new THREE.Vector3(-1, 1, 0), rotation: new THREE.Euler() },
    { id: 4, position: new THREE.Vector3(0, 1, 0), rotation: new THREE.Euler() },
    { id: 5, position: new THREE.Vector3(1, 1, 0), rotation: new THREE.Euler() },
    { id: 6, position: new THREE.Vector3(-1, 1, 1), rotation: new THREE.Euler() },
    { id: 7, position: new THREE.Vector3(0, 1, 1), rotation: new THREE.Euler() },
    { id: 8, position: new THREE.Vector3(1, 1, 1), rotation: new THREE.Euler() },
    { id: 9, position: new THREE.Vector3(-1, 0, -1), rotation: new THREE.Euler() },
    { id: 10, position: new THREE.Vector3(0, 0, -1), rotation: new THREE.Euler() },
    { id: 11, position: new THREE.Vector3(1, 0, -1), rotation: new THREE.Euler() },
    { id: 12, position: new THREE.Vector3(-1, 0, 0), rotation: new THREE.Euler() },
    { id: 13, position: new THREE.Vector3(0, 0, 0), rotation: new THREE.Euler() },
    { id: 14, position: new THREE.Vector3(1, 0, 0), rotation: new THREE.Euler() },
    { id: 15, position: new THREE.Vector3(-1, 0, 1), rotation: new THREE.Euler() },
    { id: 16, position: new THREE.Vector3(0, 0, 1), rotation: new THREE.Euler() },
    { id: 17, position: new THREE.Vector3(1, 0, 1), rotation: new THREE.Euler() },
    { id: 18, position: new THREE.Vector3(-1, -1, -1), rotation: new THREE.Euler() },
    { id: 19, position: new THREE.Vector3(0, -1, -1), rotation: new THREE.Euler() },
    { id: 20, position: new THREE.Vector3(1, -1, -1), rotation: new THREE.Euler() },
    { id: 21, position: new THREE.Vector3(-1, -1, 0), rotation: new THREE.Euler() },
    { id: 22, position: new THREE.Vector3(0, -1, 0), rotation: new THREE.Euler() },
    { id: 23, position: new THREE.Vector3(1, -1, 0), rotation: new THREE.Euler() },
    { id: 24, position: new THREE.Vector3(-1, -1, 1), rotation: new THREE.Euler() },
    { id: 25, position: new THREE.Vector3(0, -1, 1), rotation: new THREE.Euler() },
    { id: 26, position: new THREE.Vector3(1, -1, 1), rotation: new THREE.Euler() },
  ];
  private readonly _cubeFacePiecesIdxs: typeof this.cubeFacePiecesIdxs = {
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

  public get cubePiecesBasicData(): Array<TRubikCubePieceBasicData> {
    return this._cubePiecesBasicData;
  }
  public get cubeFacePiecesIdxs(): Record<TRubikCube3x3FaceNames, Array<number>> {
    return this._cubeFacePiecesIdxs;
  }
}

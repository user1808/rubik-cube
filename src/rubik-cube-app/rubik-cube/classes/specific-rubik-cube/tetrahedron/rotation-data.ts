import * as THREE from 'three';
import { Radians } from '@/utils/radians';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx, TRotationTypeData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronRotationData
  implements IRubikCubeRotationData<TTetrahedronRotationGroups, TTetrahedronRotationTypes>
{
  private readonly _rotationTypesData: typeof this.rotationTypesData = {
    Clockwise: {
      angle: -2 * Radians['60deg'],
      durationInSeconds: 0.5,
      stepsCount: 4,
    },
    CounterClockwise: {
      angle: 2 * Radians['60deg'],
      durationInSeconds: 0.5,
      stepsCount: 8,
    },
  };
  private readonly _rotationGroupsNormalVectors: typeof this.rotationGroupsNormalVectors = {
    Front: new THREE.Vector3(0.471, 0.333, 0.8165),
    Right: new THREE.Vector3(0.471, 0.333, -0.8165),
    Left: new THREE.Vector3(-0.943, 0.333, 0),
    Down: new THREE.Vector3(0, -1, 0),
    RightCorner: new THREE.Vector3(0.943, -0.333, 0),
    LeftCorner: new THREE.Vector3(-0.471, -0.333, 0.8165),
    BackCorner: new THREE.Vector3(-0.471, -0.333, -0.8165),
    UpCorner: new THREE.Vector3(0, 1, 0),
    RightMidLayer: new THREE.Vector3(0.943, -0.333, 0),
    LeftMidLayer: new THREE.Vector3(-0.471, -0.333, 0.8165),
    BackMidLayer: new THREE.Vector3(-0.471, -0.333, -0.8165),
    UpMidLayer: new THREE.Vector3(0, 1, 0),
  };
  private readonly _rotationPiecesChangesPatterns: typeof this.rotationPiecesChangesPatterns = {
    Clockwise: {
      Front: [6, 7, 8, 0, 1, 2, 3, 4, 5],
      Right: [6, 7, 8, 0, 1, 2, 3, 4, 5],
      Left: [6, 7, 8, 0, 1, 2, 3, 4, 5],
      Down: [6, 7, 8, 0, 1, 2, 3, 4, 5],
      RightCorner: [0],
      LeftCorner: [0],
      BackCorner: [0],
      UpCorner: [0],
      RightMidLayer: [2, 0, 1, 3],
      LeftMidLayer: [2, 0, 1, 3],
      BackMidLayer: [2, 0, 1, 3],
      UpMidLayer: [2, 0, 1, 3],
    },
    CounterClockwise: {
      Front: [3, 4, 5, 6, 7, 8, 0, 1, 2],
      Right: [3, 4, 5, 6, 7, 8, 0, 1, 2],
      Left: [3, 4, 5, 6, 7, 8, 0, 1, 2],
      Down: [3, 4, 5, 6, 7, 8, 0, 1, 2],
      RightCorner: [0],
      LeftCorner: [0],
      BackCorner: [0],
      UpCorner: [0],
      RightMidLayer: [1, 2, 0, 3],
      LeftMidLayer: [1, 2, 0, 3],
      BackMidLayer: [1, 2, 0, 3],
      UpMidLayer: [1, 2, 0, 3],
    },
  };

  public get rotationTypesData(): Record<TTetrahedronRotationTypes, TRotationTypeData> {
    return this._rotationTypesData;
  }
  public get rotationGroupsNormalVectors(): Record<TTetrahedronRotationGroups, THREE.Vector3> {
    return this._rotationGroupsNormalVectors;
  }
  public get rotationPiecesChangesPatterns(): Record<
    TTetrahedronRotationTypes,
    Record<TTetrahedronRotationGroups, Array<TPieceIdx>>
  > {
    return this._rotationPiecesChangesPatterns;
  }
}

import * as THREE from 'three';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron3x3RotationData extends AbstractRubikHexahedronRotationData<THexahedron3x3RotationGroups> {
  private readonly _rotationGroupsNormalVectors: typeof this.rotationGroupsNormalVectors = {
    Front: new THREE.Vector3(0, 0, 1),
    Back: new THREE.Vector3(0, 0, -1),
    Right: new THREE.Vector3(1, 0, 0),
    Left: new THREE.Vector3(-1, 0, 0),
    Up: new THREE.Vector3(0, 1, 0),
    Down: new THREE.Vector3(0, -1, 0),
    XSlice: new THREE.Vector3(1, 0, 0),
    YSlice: new THREE.Vector3(0, 1, 0),
    ZSlice: new THREE.Vector3(0, 0, 1),
  };

  private readonly _rotationGroupsNewIdxs: typeof this.rotationGroupsNewIdxs = {
    Clockwise: {
      Front: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Back: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Right: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Left: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Up: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Down: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      XSlice: [5, 3, 0, 6, 1, 7, 4, 2],
      YSlice: [5, 3, 0, 6, 1, 7, 4, 2],
      ZSlice: [5, 3, 0, 6, 1, 7, 4, 2],
    },
    CounterClockwise: {
      Front: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Back: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Right: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Left: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Up: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Down: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      XSlice: [2, 4, 7, 1, 6, 0, 3, 5],
      YSlice: [2, 4, 7, 1, 6, 0, 3, 5],
      ZSlice: [2, 4, 7, 1, 6, 0, 3, 5],
    },
    Double: {
      Front: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Back: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Right: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Left: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Up: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Down: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      XSlice: [7, 6, 5, 4, 3, 2, 1, 0],
      YSlice: [7, 6, 5, 4, 3, 2, 1, 0],
      ZSlice: [7, 6, 5, 4, 3, 2, 1, 0],
    },
  };

  public get rotationGroupsNormalVectors(): Record<THexahedron3x3RotationGroups, THREE.Vector3> {
    return this._rotationGroupsNormalVectors;
  }
  public get rotationGroupsNewIdxs(): Record<
    THexahedronRotationTypes,
    Record<THexahedron3x3RotationGroups, Array<number>>
  > {
    return this._rotationGroupsNewIdxs;
  }
}

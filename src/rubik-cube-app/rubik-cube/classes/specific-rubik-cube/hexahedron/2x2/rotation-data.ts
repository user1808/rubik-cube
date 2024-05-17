import * as THREE from 'three';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron2x2RotationData extends AbstractRubikHexahedronRotationData<THexahedron2x2RotationGroups> {
  private readonly _rotationGroupsNormalVectors: typeof this.rotationGroupsNormalVectors = {
    Front: new THREE.Vector3(0, 0, 1),
    Back: new THREE.Vector3(0, 0, -1),
    Right: new THREE.Vector3(1, 0, 0),
    Left: new THREE.Vector3(-1, 0, 0),
    Up: new THREE.Vector3(0, 1, 0),
    Down: new THREE.Vector3(0, -1, 0),
  };
  private readonly _rotationGroupsNewIdxs: typeof this.rotationGroupsNewIdxs = {
    Clockwise: {
      Front: [2, 0, 3, 1],
      Back: [2, 0, 3, 1],
      Right: [2, 0, 3, 1],
      Left: [2, 0, 3, 1],
      Up: [2, 0, 3, 1],
      Down: [2, 0, 3, 1],
    },
    CounterClockwise: {
      Front: [1, 3, 0, 2],
      Back: [1, 3, 0, 2],
      Right: [1, 3, 0, 2],
      Left: [1, 3, 0, 2],
      Up: [1, 3, 0, 2],
      Down: [1, 3, 0, 2],
    },
    Double: {
      Front: [3, 2, 1, 0],
      Back: [3, 2, 1, 0],
      Right: [3, 2, 1, 0],
      Left: [3, 2, 1, 0],
      Up: [3, 2, 1, 0],
      Down: [3, 2, 1, 0],
    },
  };

  public get rotationGroupsNormalVectors(): Record<THexahedron2x2RotationGroups, THREE.Vector3> {
    return this._rotationGroupsNormalVectors;
  }
  public get rotationGroupsNewIdxs(): Record<
    THexahedronRotationTypes,
    Record<THexahedron2x2RotationGroups, Array<number>>
  > {
    return this._rotationGroupsNewIdxs;
  }
}

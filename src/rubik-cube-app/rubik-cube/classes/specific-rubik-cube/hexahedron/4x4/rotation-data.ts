import * as THREE from 'three';
import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron4x4RotationData extends AbstractRubikHexahedronRotationData<THexahedron4x4RotationGroups> {
  public override readonly rotationGroupsNormalVectors: Record<
    THexahedron4x4RotationGroups,
    THREE.Vector3
  > = {
    Front: new THREE.Vector3(0, 0, 1),
    Back: new THREE.Vector3(0, 0, -1),
    Right: new THREE.Vector3(1, 0, 0),
    Left: new THREE.Vector3(-1, 0, 0),
    Up: new THREE.Vector3(0, 1, 0),
    Down: new THREE.Vector3(0, -1, 0),
    FrontSlice: new THREE.Vector3(0, 0, 1),
    BackSlice: new THREE.Vector3(0, 0, -1),
    RightSlice: new THREE.Vector3(1, 0, 0),
    LeftSlice: new THREE.Vector3(-1, 0, 0),
    UpSlice: new THREE.Vector3(0, 1, 0),
    DownSlice: new THREE.Vector3(0, -1, 0),
  };
  public override readonly rotationPiecesChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedron4x4RotationGroups, Array<number>>
  > = {
    Clockwise: {
      Front: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      Back: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      Right: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      Left: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      Up: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      Down: [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
      FrontSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
      BackSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
      RightSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
      LeftSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
      UpSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
      DownSlice: [8, 6, 4, 0, 9, 1, 10, 2, 11, 7, 5, 3],
    },
    CounterClockwise: {
      Front: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      Back: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      Right: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      Left: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      Up: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      Down: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
      FrontSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
      BackSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
      RightSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
      LeftSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
      UpSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
      DownSlice: [3, 5, 7, 11, 2, 10, 1, 9, 0, 4, 6, 8],
    },
    Double: {
      Front: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      Back: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      Right: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      Left: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      Up: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      Down: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      FrontSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      BackSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      RightSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      LeftSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      UpSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      DownSlice: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    },
  };
}

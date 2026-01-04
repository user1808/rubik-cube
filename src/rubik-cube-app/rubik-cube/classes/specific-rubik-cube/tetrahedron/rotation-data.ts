import { Vector3 } from 'three';
import { Radians } from '@/utils/radians';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronRotationData
  implements IRubikCubeRotationData<TTetrahedronRotationGroups, TTetrahedronRotationTypes>
{
  public readonly rotationAngles: Record<TTetrahedronRotationTypes, number> = {
    Clockwise: -2 * Radians['60deg'],
    CounterClockwise: 2 * Radians['60deg'],
  };
  public readonly rotationGroupsNormalVectors: Record<TTetrahedronRotationGroups, Vector3> = {
    Front: new Vector3(0.471, 0.333, 0.8165),
    Right: new Vector3(0.471, 0.333, -0.8165),
    Left: new Vector3(-0.943, 0.333, 0),
    Down: new Vector3(0, -1, 0),
    RightCorner: new Vector3(0.943, -0.333, 0),
    LeftCorner: new Vector3(-0.471, -0.333, 0.8165),
    BackCorner: new Vector3(-0.471, -0.333, -0.8165),
    UpCorner: new Vector3(0, 1, 0),
    RightMidLayer: new Vector3(0.943, -0.333, 0),
    LeftMidLayer: new Vector3(-0.471, -0.333, 0.8165),
    BackMidLayer: new Vector3(-0.471, -0.333, -0.8165),
    UpMidLayer: new Vector3(0, 1, 0),
  };
  public readonly rotationPiecesChangesPatterns: Record<
    TTetrahedronRotationTypes,
    Record<TTetrahedronRotationGroups, Array<TPieceIdx>>
  > = {
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
  public readonly rotationGroupsNotation: Record<TTetrahedronRotationGroups, string> = {
    Front: 'F',
    Right: 'R',
    Left: 'L',
    Down: 'D',
    RightCorner: 'r',
    LeftCorner: 'l',
    BackCorner: 'b',
    UpCorner: 'u',
    RightMidLayer: 'RM',
    LeftMidLayer: 'LM',
    BackMidLayer: 'BM',
    UpMidLayer: 'UM',
  };
  public readonly rotationTypesNotation: Record<TTetrahedronRotationTypes, string> = {
    Clockwise: '',
    CounterClockwise: "'",
  };
  public readonly contraryRotationTypes: Record<
    TTetrahedronRotationTypes,
    TTetrahedronRotationTypes
  > = {
    Clockwise: 'CounterClockwise',
    CounterClockwise: 'Clockwise',
  };
}

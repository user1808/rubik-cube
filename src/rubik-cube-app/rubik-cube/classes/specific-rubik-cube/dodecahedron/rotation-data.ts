import { Vector3 } from 'three';
import type {
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type { TRotationTypeData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { Radians } from '@/utils/radians';
export class RubikDodecahedronRotationData
  implements IRubikCubeRotationData<TDodecahedronRotationGroups, TDodecahedronRotationTypes>
{
  public readonly rotationTypesData: Record<TDodecahedronRotationTypes, TRotationTypeData> = {
    Clockwise: {
      angle: -Radians['72deg'],
      durationInSeconds: 0.5,
      stepsCount: 5,
    },
    CounterClockwise: {
      angle: Radians['72deg'],
      durationInSeconds: 0.5,
      stepsCount: 5,
    },
    DoubleClockwise: {
      angle: -2 * Radians['72deg'],
      durationInSeconds: 0.5,
      stepsCount: 10,
    },
    DoubleCounterClockwise: {
      angle: 2 * Radians['72deg'],
      durationInSeconds: 0.5,
      stepsCount: 10,
    },
  };
  public readonly rotationGroupsNormalVectors: Record<TDodecahedronRotationGroups, Vector3> = {
    Up: new Vector3(0, 1, 0),
    Down: new Vector3(0, -1, 0),
    Right: new Vector3(0.85065, 0.4472, 0.2764),
    BackLeft: new Vector3(-0.85065, -0.4472, -0.2764),
    Front: new Vector3(0, 0.4472, 0.8944),
    Back: new Vector3(0, -0.4472, -0.8944),
    Left: new Vector3(-0.85065, 0.4472, 0.2764),
    BackRight: new Vector3(0.85065, -0.4472, -0.2764),
    UpLeft: new Vector3(-0.5257, 0.4472, -0.7236),
    DownRight: new Vector3(0.5257, -0.4472, 0.7236),
    UpRight: new Vector3(0.5257, 0.4472, -0.7236),
    DownLeft: new Vector3(-0.5257, -0.4472, 0.7236),
  };
  public readonly rotationPiecesChangesPatterns: Record<
    TDodecahedronRotationTypes,
    Record<TDodecahedronRotationGroups, Array<number>>
  > = {
    Clockwise: {
      Up: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      Down: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      Right: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      BackLeft: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      Front: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      Back: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      Left: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      BackRight: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      UpLeft: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      DownRight: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      UpRight: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
      DownLeft: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10],
    },
    CounterClockwise: {
      Up: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      Down: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      Right: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      BackLeft: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      Front: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      Back: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      Left: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      BackRight: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      UpLeft: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      DownRight: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      UpRight: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
      DownLeft: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10],
    },
    DoubleClockwise: {
      Up: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      Down: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      Right: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      BackLeft: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      Front: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      Back: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      Left: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      BackRight: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      UpLeft: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      DownRight: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      UpRight: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
      DownLeft: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10],
    },
    DoubleCounterClockwise: {
      Up: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      Down: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      Right: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      BackLeft: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      Front: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      Back: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      Left: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      BackRight: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      UpLeft: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      DownRight: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      UpRight: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
      DownLeft: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10],
    },
  };
}

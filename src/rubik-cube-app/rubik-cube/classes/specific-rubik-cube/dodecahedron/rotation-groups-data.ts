import type { IRubikCubeRotationGroupsData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';

export class RubikDodecahedronRotationGroupsData
  implements IRubikCubeRotationGroupsData<TDodecahedronRotationGroups>
{
  public readonly rotationGroupsPiecesIdxs: Record<TDodecahedronRotationGroups, Array<TPieceIdx>> =
    {
      Up: [0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 10],
      Down: [53, 58, 52, 57, 51, 56, 55, 60, 54, 59, 61],
      Right: [1, 5, 11, 21, 27, 37, 28, 22, 12, 6, 17],
      BackLeft: [54, 60, 50, 40, 33, 24, 32, 39, 49, 59, 44],
      Front: [0, 9, 15, 25, 35, 36, 26, 21, 11, 5, 16],
      Back: [53, 59, 49, 39, 31, 23, 30, 38, 48, 58, 43],
      Left: [4, 8, 14, 24, 33, 40, 34, 25, 15, 9, 20],
      BackRight: [52, 58, 48, 38, 29, 22, 28, 37, 47, 57, 42],
      UpLeft: [3, 7, 13, 23, 31, 39, 32, 24, 14, 8, 19],
      DownRight: [51, 57, 47, 37, 27, 21, 26, 36, 46, 56, 41],
      UpRight: [2, 6, 12, 22, 29, 38, 30, 23, 13, 7, 18],
      DownLeft: [55, 56, 46, 36, 35, 25, 34, 40, 50, 60, 45],
    };
}

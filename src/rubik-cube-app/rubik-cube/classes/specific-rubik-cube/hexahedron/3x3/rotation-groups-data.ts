import type { IRubikCubeRotationGroupsData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';

export class RubikHexahedron3x3RotationGroupsData
  implements IRubikCubeRotationGroupsData<THexahedron3x3RotationGroups>
{
  public readonly rotationGroupsPiecesIdxs: Record<THexahedron3x3RotationGroups, Array<TPieceIdx>> =
    {
      Front: [6, 7, 8, 14, 15, 16, 23, 24, 25],
      Back: [2, 1, 0, 11, 10, 9, 19, 18, 17],
      Right: [8, 5, 2, 16, 13, 11, 25, 22, 19],
      Left: [0, 3, 6, 9, 12, 14, 17, 20, 23],
      Up: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      Down: [23, 24, 25, 20, 21, 22, 17, 18, 19],
      SliceX: [7, 4, 1, 15, 10, 24, 21, 18],
      SliceY: [9, 10, 11, 12, 13, 14, 15, 16],
      SliceZ: [3, 4, 5, 12, 13, 20, 21, 22],
    };
}

import type { IRubikCubeRotationGroupsData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';

export class RubikHexahedron2x2RotationGroupsData
  implements IRubikCubeRotationGroupsData<THexahedron2x2RotationGroups>
{
  public readonly rotationGroupsPiecesIdxs: Record<THexahedron2x2RotationGroups, Array<TPieceIdx>> =
    {
      Front: [2, 3, 6, 7],
      Back: [1, 0, 5, 4],
      Right: [3, 1, 7, 5],
      Left: [0, 2, 4, 6],
      Up: [0, 1, 2, 3],
      Down: [6, 7, 4, 5],
    };
}

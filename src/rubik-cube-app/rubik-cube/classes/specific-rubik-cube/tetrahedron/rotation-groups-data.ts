import type { IRubikCubeRotationGroupsData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TTetrahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronRotationGroupsData
  implements IRubikCubeRotationGroupsData<TTetrahedronRotationGroups>
{
  public readonly rotationGroupsPiecesIdxs: Record<TTetrahedronRotationGroups, Array<TPieceIdx>> = {
    Front: [0, 1, 3, 10, 6, 9, 8, 5, 2],
    Right: [0, 1, 4, 12, 7, 11, 10, 6, 3],
    Left: [0, 1, 2, 8, 5, 13, 12, 7, 4],
    Down: [8, 5, 9, 10, 6, 11, 12, 7, 13],
    RightCorner: [10],
    LeftCorner: [8],
    BackCorner: [12],
    UpCorner: [0],
    RightMidLayer: [3, 11, 9, 6],
    LeftMidLayer: [2, 9, 13, 5],
    BackMidLayer: [4, 13, 11, 7],
    UpMidLayer: [2, 4, 3, 1],
  };
}

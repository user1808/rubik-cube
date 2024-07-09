import type { IRubikCubeRotationGroupsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TPieceDataIdx, TRotationGroups } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeRotationGroupsBuidler<TCubeRotationGroups extends string>
  implements IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>
{
  constructor(
    private readonly rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<TPieceDataIdx>>,
  ) {}

  public buildRotationGroups(
    cubePieces: Array<IRubikCubePieceWrapper>,
  ): TRotationGroups<TCubeRotationGroups> {
    return Object.entries<(typeof this.rotationGroupsPiecesIdxs)[TCubeRotationGroups]>(
      this.rotationGroupsPiecesIdxs,
    ).reduce((rotationGroups, [rotationGroupName, rotationGroupPiecesIdxs]) => {
      rotationGroups[rotationGroupName as TCubeRotationGroups] = rotationGroupPiecesIdxs.map(
        (idx) => cubePieces[idx],
      );
      return rotationGroups;
    }, {} as TRotationGroups<TCubeRotationGroups>);
  }
}

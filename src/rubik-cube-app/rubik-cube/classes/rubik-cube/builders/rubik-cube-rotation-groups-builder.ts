import type { IRubikCubeRotationGroupBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-group-builder';
import type { IRubikCubeRotationGroupsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-groups-builder';
import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubeRotationGroupsBuidler<TCubeRotationGroups extends string>
  implements IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>
{
  constructor(private rotationGroupBuilder: IRubikCubeRotationGroupBuilder) {}

  public buildRotationGroups(
    cubePieces: Array<IRubikCubePieceWrapper>,
    rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<number>>,
  ): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>> {
    return Object.entries<(typeof rotationGroupsPiecesIdxs)[TCubeRotationGroups]>(
      rotationGroupsPiecesIdxs,
    ).reduce(
      (rotationGroups, [rotationGroupName, rotationGroupPiecesIdxs]) => {
        rotationGroups[rotationGroupName as TCubeRotationGroups] =
          this.rotationGroupBuilder.buildRotationGroup(cubePieces, rotationGroupPiecesIdxs);
        return rotationGroups;
      },
      {} as Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>,
    );
  }
}

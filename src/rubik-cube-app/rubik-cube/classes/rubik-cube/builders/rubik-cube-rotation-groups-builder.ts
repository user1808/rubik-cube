import type { IRubikCubeRotationGroupsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-groups-builder';
import type {
  IRubikCube,
  IRubikCubePieceWrapper,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubeRotationGroupsBuidler<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> implements
    IRubikCubeRotationGroupsBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly cubePieces: Array<IRubikCubePieceWrapper>,
    private readonly rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<number>>,
  ) {}

  public buildRotationGroups(): IRubikCube<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >['rotationGroups'] {
    return Object.entries<(typeof this.rotationGroupsPiecesIdxs)[TCubeRotationGroups]>(
      this.rotationGroupsPiecesIdxs,
    ).reduce(
      (rotationGroups, [rotationGroupName, rotationGroupPiecesIdxs]) => {
        rotationGroups[rotationGroupName as TCubeRotationGroups] = rotationGroupPiecesIdxs.map(
          (idx) => this.cubePieces[idx],
        );
        return rotationGroups;
      },
      {} as IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>['rotationGroups'],
    );
  }
}

import type { IRubikCubeRotationGroupsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeRotationGroupsData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TCubePieces, TRotationGroups } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeRotationGroupsBuidler<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements IRubikCubeRotationGroupsBuilder<TCubeFacesNames, TCubeRotationGroups>
{
  constructor(
    private readonly rotationGroupsData: IRubikCubeRotationGroupsData<TCubeRotationGroups>,
  ) {}

  public buildRotationGroups(
    cubePieces: TCubePieces<TCubeFacesNames>,
  ): TRotationGroups<TCubeFacesNames, TCubeRotationGroups> {
    const { rotationGroupsPiecesIdxs } = this.rotationGroupsData;
    return Object.entries<(typeof rotationGroupsPiecesIdxs)[TCubeRotationGroups]>(
      rotationGroupsPiecesIdxs,
    ).reduce(
      (rotationGroups, [rotationGroupName, rotationGroupPiecesIdxs]) => {
        rotationGroups[rotationGroupName as TCubeRotationGroups] = rotationGroupPiecesIdxs.map(
          (idx) => cubePieces[idx],
        );
        return rotationGroups;
      },
      {} as TRotationGroups<TCubeFacesNames, TCubeRotationGroups>,
    );
  }
}

import { Group } from 'three';
import type { IRubikCubeShell } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeShell<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellFilenames extends string,
  >
  extends Group
  implements IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
{
  constructor(
    public readonly pieces: TShellPieces<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {
    super();
    if (pieces.length > 0) this.add(...pieces);
  }
}

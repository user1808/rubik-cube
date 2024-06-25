import type { IRubikCubeShell } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type {
  IRubikCubeShellBuilder,
  IRubikCubeShellPiecesBuilder,
} from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import { RubikCubeShell } from '../structure/shell/rubik-cube-shell';

export class RubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> implements IRubikCubeShellBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly shellPiecesBuilder: IRubikCubeShellPiecesBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ) {}

  public buildShell(): IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    return new RubikCubeShell(this.shellPiecesBuilder.buildShellPieces());
  }
}

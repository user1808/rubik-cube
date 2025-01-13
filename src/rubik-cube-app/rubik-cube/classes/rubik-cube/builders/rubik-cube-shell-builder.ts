import type { IRubikCubeShell } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type {
  IRubikCubeShellBuilder,
  IRubikCubeShellPiecesBuilder,
} from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import { RubikCubeShell } from '../structure/shell/rubik-cube-shell';

export class RubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> implements IRubikCubeShellBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
{
  constructor(
    private readonly shellPiecesBuilder: IRubikCubeShellPiecesBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {}

  public async buildShell(): Promise<
    IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  > {
    const shellPieces = await this.shellPiecesBuilder.buildShellPieces();
    return new RubikCubeShell(shellPieces);
  }
}

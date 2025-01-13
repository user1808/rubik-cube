import type { BufferGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCubeShellPiece<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
> extends Mesh<BufferGeometry, MeshBasicMaterial> {
  readonly data: TShellPieceData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename
  >['rotations'];
}

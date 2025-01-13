import type { BufferGeometry, MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import type { IRubikCubeShellPiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeShellPiece<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellFilename extends string,
  >
  extends Mesh<BufferGeometry, MeshBasicMaterial>
  implements IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilename>
{
  constructor(
    public readonly data: TShellPieceData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename
    >['rotations'],
    geometry: BufferGeometry,
    material: MeshBasicMaterial,
  ) {
    super(geometry, material);
  }
}

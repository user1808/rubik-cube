import * as THREE from 'three';
import type { IRubikCubeShellPiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeShellPiece<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellFilename extends string,
  >
  extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  implements IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilename>
{
  constructor(
    public readonly data: TShellPieceData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename
    >['rotations'],
    geometry: THREE.BufferGeometry,
    material: THREE.MeshBasicMaterial,
  ) {
    super(geometry, material);
  }
}

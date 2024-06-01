import type { IRubikCubeShellPiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import * as THREE from 'three';

export class RubikCubeShellPiece<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellPiece extends string,
  >
  extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  implements IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPiece>
{
  constructor(
    public override readonly name: TCubeShellPiece,
    public readonly data: TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>,
    geometry: THREE.BufferGeometry,
    material: THREE.MeshBasicMaterial,
  ) {
    super(geometry, material);
  }
}

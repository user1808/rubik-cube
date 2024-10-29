import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCubeShellPiece<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPiece extends string,
> extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  readonly name: TCubeShellPiece;
  readonly data: TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>;
}

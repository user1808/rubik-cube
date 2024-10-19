import type { TCubeFaceMaterial, TCubeInsignificantFaceMaterial } from '../../types/rubik-cube';

export interface IRubikCubeMaterials<TCubeFaces extends string, TCubeEdgeFaces extends string> {
  readonly cubeFacesMaterials: Record<TCubeFaces, TCubeFaceMaterial>;
  readonly cubeEdgeFacesMaterials: Record<TCubeEdgeFaces, TCubeInsignificantFaceMaterial>;
  readonly cubeInvisibleFacesMaterials: TCubeInsignificantFaceMaterial;
}

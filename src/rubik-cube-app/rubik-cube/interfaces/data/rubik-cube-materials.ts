import type { MeshBasicMaterial } from 'three';
import type { TCubeFaceMaterial } from '../../types/rubik-cube';

export interface IRubikCubeMaterials<
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
> {
  readonly cubeFacesMaterials: Record<TCubeFacesNames, TCubeFaceMaterial>;
  readonly cubeEdgeFacesMaterials: Record<TCubeEdgeFacesNames, MeshBasicMaterial>;
  readonly cubeInvisibleFacesMaterials: MeshBasicMaterial;

  readonly initCubeFacesColors: Record<TCubeFacesNames, null>;
}

import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikHexahedronMaterials } from './materials';
import type { THexahedronPiecesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';

export abstract class ARubikHexahedronFactory extends ARubikCubeFactory<
  THexahedronPiecesWithFaces,
  THexahedronFaces
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<THexahedronFaces> {
    return new RubikHexahedronMaterials();
  }
}

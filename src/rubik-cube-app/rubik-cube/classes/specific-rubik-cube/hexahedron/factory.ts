import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikHexahedronMaterials } from './materials';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';

export abstract class ARubikHexahedronFactory extends AbstractRubikCubeFactory<
  THexahedronPiecesFilenamesWithFaces,
  THexahedronFaces,
  THexahedronEdgeFaces
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<THexahedronFaces, THexahedronEdgeFaces> {
    return new RubikHexahedronMaterials();
  }
}

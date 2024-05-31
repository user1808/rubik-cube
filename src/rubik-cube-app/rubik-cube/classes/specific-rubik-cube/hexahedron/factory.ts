import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikHexahedronMaterials } from './materials';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';

export abstract class AbstractRubikHexahedronFactory<
  THexahedronRotationGroups extends string,
> extends AbstractRubikCubeFactory<
  THexahedronPiecesFilenamesWithFaces,
  THexahedronFaces,
  THexahedronEdgeFaces,
  THexahedronRotationGroups,
  THexahedronRotationTypes
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<THexahedronFaces, THexahedronEdgeFaces> {
    return new RubikHexahedronMaterials();
  }
}

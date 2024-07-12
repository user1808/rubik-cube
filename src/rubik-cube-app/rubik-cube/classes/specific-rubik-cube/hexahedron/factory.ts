import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type {
  IRubikCubeMaterials,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { RubikHexahedronMaterials } from './materials';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';

export abstract class AbstractRubikHexahedronFactory<
  THexahedronRotationGroups extends string,
> extends AbstractRubikCubeFactory<
  THexahedronPiecesFilenamesWithFaces,
  THexahedronFaces,
  THexahedronEdgeFaces,
  THexahedronRotationGroups,
  THexahedronRotationTypes,
  'TODO',
  'TODO'
> {
  public override createRubikCubeShellData(): IRubikCubeShellData<
    THexahedronRotationGroups,
    THexahedronRotationTypes,
    'TODO',
    'TODO'
  > {
    throw new Error('Method not implemented.');
  }
  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    THexahedronFaces,
    THexahedronEdgeFaces
  > {
    return new RubikHexahedronMaterials();
  }
}

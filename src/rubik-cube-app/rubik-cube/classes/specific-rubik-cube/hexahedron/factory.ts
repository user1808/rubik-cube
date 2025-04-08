import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type {
  THexahedronEdgeFaces,
  THexahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { RubikHexahedronMaterials } from './materials';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';

export abstract class AbstractRubikHexahedronFactory<
  THexahedronCommonName extends TCubeCommonNames,
  THexahedronRotationGroups extends string,
  THexahedronShellFilename extends string,
  THexahedronFacesTextsFilename extends string,
> extends AbstractRubikCubeFactory<
  THexahedronPiecesFilenamesWithFaces,
  THexahedronCommonName,
  THexahedronFaces,
  THexahedronEdgeFaces,
  THexahedronRotationGroups,
  THexahedronRotationTypes,
  THexahedronShellFilename,
  THexahedronFacesTextsFilename
> {
  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    THexahedronFaces,
    THexahedronEdgeFaces
  > {
    return new RubikHexahedronMaterials();
  }
}

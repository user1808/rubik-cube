import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import {
  HexahedronRotationTypes,
  type THexahedronRotationTypes,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import {
  HexahedronFaces,
  type THexahedronEdgeFaces,
  type THexahedronFaces,
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
  public override readonly facesNames: Readonly<Array<THexahedronFaces>> = HexahedronFaces;
  public override readonly rotationTypesNames: Readonly<Array<THexahedronRotationTypes>> =
    HexahedronRotationTypes;

  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    THexahedronFaces,
    THexahedronEdgeFaces
  > {
    return new RubikHexahedronMaterials();
  }
}

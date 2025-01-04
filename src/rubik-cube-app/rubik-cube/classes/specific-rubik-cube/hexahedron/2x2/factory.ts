import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type {
  IRubikCubeFacesData,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikHexahedron2x2RotationData } from './rotation-data';
import { RubikHexahedron2x2PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron2x2RotationGroupsData } from './rotation-groups-data';
import { RubikHexahedron2x2ShellData } from './shell-data';
import { RubikHexahedron2x2FacesData } from './faces-data';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import type { TCubeCommonName } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';

export class RubikHexahedron2x2Factory extends AbstractRubikHexahedronFactory<
  THexahedron2x2RotationGroups,
  THexahedronShellFilenames
> {
  public override get commonName(): TCubeCommonName {
    return '2x2 Cube';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron2x2PiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<THexahedronFaces> {
    return new RubikHexahedron2x2FacesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<THexahedron2x2RotationGroups> {
    return new RubikHexahedron2x2RotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron2x2RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron2x2RotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    THexahedron2x2RotationGroups,
    THexahedronRotationTypes,
    THexahedronShellFilenames
  > {
    return new RubikHexahedron2x2ShellData();
  }
}

import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import type { TCubeCommonName } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type {
  IRubikCubeFacesData,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikHexahedron5x5RotationData } from './rotation-data';
import { RubikHexahedron5x5PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron5x5RotationGroupsData } from './rotation-groups-data';
import { RubikHexahedron5x5ShellData } from './shell-data';
import { RubikHexahedron5x5FacesData } from './faces-data';

export class RubikHexahedron5x5Factory extends AbstractRubikHexahedronFactory<
  THexahedron5x5RotationGroups,
  THexahedronShellFilenames
> {
  public override get commonName(): TCubeCommonName {
    return '5x5 Cube';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron5x5PiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<THexahedronFaces> {
    return new RubikHexahedron5x5FacesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<THexahedron5x5RotationGroups> {
    return new RubikHexahedron5x5RotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron5x5RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron5x5RotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    THexahedron5x5RotationGroups,
    THexahedronRotationTypes,
    THexahedronShellFilenames
  > {
    return new RubikHexahedron5x5ShellData();
  }
}

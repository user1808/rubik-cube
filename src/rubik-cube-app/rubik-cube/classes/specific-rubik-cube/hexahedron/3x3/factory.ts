import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';

import type {
  IRubikCubeFacesData,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikHexahedron3x3RotationData } from './rotation-data';
import { RubikHexahedron3x3PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron3x3RotationGroupsData } from './rotation-groups-data';
import { RubikHexahedron3x3ShellData } from './shell-data';
import { RubikHexahedron3x3FacesData } from './faces-data';

export class RubikHexahedron3x3Factory extends AbstractRubikHexahedronFactory<
  THexahedron3x3RotationGroups,
  THexahedronShellFilenames
> {
  public override get commonName(): string {
    return '3x3 Cube';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron3x3PiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<THexahedronFaces> {
    return new RubikHexahedron3x3FacesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<THexahedron3x3RotationGroups> {
    return new RubikHexahedron3x3RotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron3x3RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron3x3RotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    THexahedron3x3RotationGroups,
    THexahedronRotationTypes,
    THexahedronShellFilenames
  > {
    return new RubikHexahedron3x3ShellData();
  }
}

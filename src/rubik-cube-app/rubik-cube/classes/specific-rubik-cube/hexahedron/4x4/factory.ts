import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type {
  IRubikCubeFacesData,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikHexahedron4x4RotationData } from './rotation-data';
import { RubikHexahedron4x4PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron4x4RotationGroupsData } from './rotation-groups-data';
import type { THexahedron4x4ShellFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/shell-filename';
import type { THexahedron4x4ShellPieces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/shell-pieces';
import { RubikHexahedron4x4ShellData } from './shell-data';
import { RubikHexahedron4x4FacesData } from './faces-data';

export class RubikHexahedron4x4Factory extends AbstractRubikHexahedronFactory<
  THexahedron4x4RotationGroups,
  THexahedron4x4ShellFilename,
  THexahedron4x4ShellPieces
> {
  public override get commonName(): string {
    return '4x4 Cube';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron4x4PiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<THexahedronFaces> {
    return new RubikHexahedron4x4FacesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<THexahedron4x4RotationGroups> {
    return new RubikHexahedron4x4RotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron4x4RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron4x4RotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    THexahedron4x4RotationGroups,
    THexahedronRotationTypes,
    THexahedron4x4ShellFilename,
    THexahedron4x4ShellPieces
  > {
    return new RubikHexahedron4x4ShellData();
  }
}

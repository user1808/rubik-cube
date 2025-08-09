import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { THexahedronShellFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/shell-filenames';
import type {
  IRubikCubeFacesData,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { Hexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import { RubikHexahedron5x5RotationData } from './rotation-data';
import { RubikHexahedron5x5PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron5x5RotationGroupsData } from './rotation-groups-data';
import { RubikHexahedron5x5ShellData } from './shell-data';
import { RubikHexahedron5x5FacesData } from './faces-data';
import type { THexahedron5x5CommonName } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/common-name';
import type { THexahedron5x5FacesTextsFilename } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/faces-texts-filename';

export class RubikHexahedron5x5Factory extends AbstractRubikHexahedronFactory<
  THexahedron5x5CommonName,
  THexahedron5x5RotationGroups,
  THexahedronShellFilenames,
  THexahedron5x5FacesTextsFilename
> {
  public override readonly commonName: THexahedron5x5CommonName = '5x5x5 Cube';
  public override readonly cameraMinDistance: number = 2.5 * Math.sqrt(3);
  public override readonly rotationGroups: Readonly<Array<THexahedron5x5RotationGroups>> =
    Hexahedron5x5RotationGroups;
  public override readonly facesTextsFilename: THexahedron5x5FacesTextsFilename =
    'RubikHexahedron5x5FacesTexts.glb';

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

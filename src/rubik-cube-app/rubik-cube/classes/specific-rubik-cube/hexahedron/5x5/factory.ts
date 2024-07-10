import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type {
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikHexahedron5x5RotationData } from './rotation-data';
import { RubikHexahedron5x5PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import { RubikHexahedron5x5RotationGroupsData } from './rotation-groups-data';

export class RubikHexahedron5x5Factory extends AbstractRubikHexahedronFactory<THexahedron5x5RotationGroups> {
  public override get commonName(): string {
    return '5x5 Cube';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron5x5PiecesData();
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
}

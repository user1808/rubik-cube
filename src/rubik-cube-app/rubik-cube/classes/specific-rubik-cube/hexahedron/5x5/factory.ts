import { RubikHexahedron5x5PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { RubikHexahedron5x5RotationData } from './rotation-data';
import type {
  IRubikCubePiecesData,
  IRubikCubeRotationData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikHexahedron5x5Factory extends AbstractRubikHexahedronFactory<THexahedron5x5RotationGroups> {
  public get commonName(): string {
    return '5x5 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces,
    THexahedron5x5RotationGroups
  > {
    return new RubikHexahedron5x5PiecesData();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron5x5RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron5x5RotationData();
  }
}

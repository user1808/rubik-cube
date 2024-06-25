import { RubikHexahedron2x2PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { RubikHexahedron2x2RotationData } from './rotation-data';
import type {
  IRubikCubePiecesData,
  IRubikCubeRotationData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikHexahedron2x2Factory extends AbstractRubikHexahedronFactory<THexahedron2x2RotationGroups> {
  public get commonName(): string {
    return '2x2 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces,
    THexahedron2x2RotationGroups
  > {
    return new RubikHexahedron2x2PiecesData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron2x2RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron2x2RotationData();
  }
}

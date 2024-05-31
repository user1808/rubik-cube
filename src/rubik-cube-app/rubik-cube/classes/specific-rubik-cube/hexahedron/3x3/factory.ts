import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron3x3PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-data';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { RubikHexahedron3x3RotationData } from './rotation-data';

export class RubikHexahedron3x3Factory extends AbstractRubikHexahedronFactory<THexahedron3x3RotationGroups> {
  public get commonName(): string {
    return '3x3 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces,
    THexahedron3x3RotationGroups
  > {
    return new RubikHexahedron3x3PiecesData();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron3x3RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron3x3RotationData();
  }
}

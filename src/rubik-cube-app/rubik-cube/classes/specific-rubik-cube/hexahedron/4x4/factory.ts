import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron4x4PiecesData } from './pieces-data';
import { AbstractRubikHexahedronFactory } from '../factory';
import type { THexahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-data';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { RubikHexahedron4x4RotationData } from './rotation-data';

export class RubikHexahedron4x4Factory extends AbstractRubikHexahedronFactory<THexahedron4x4RotationGroups> {
  public get commonName(): string {
    return '4x4 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesFilenamesWithFaces,
    THexahedronFaces,
    THexahedron4x4RotationGroups
  > {
    return new RubikHexahedron4x4PiecesData();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    THexahedron4x4RotationGroups,
    THexahedronRotationTypes
  > {
    return new RubikHexahedron4x4RotationData();
  }
}

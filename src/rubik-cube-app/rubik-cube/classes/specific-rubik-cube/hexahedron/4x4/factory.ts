import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron4x4PiecesData } from './pieces-data';
import { ARubikHexahedronFactory } from '../factory';
import type { THexahedronPiecesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron4x4Factory extends ARubikHexahedronFactory {
  public get commonName(): string {
    return '4x4 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    THexahedronPiecesWithFaces,
    THexahedronFaces
  > {
    return new RubikHexahedron4x4PiecesData();
  }
}

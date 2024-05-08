import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron4x4PiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../../rubik-cube/helpers/rubik-cube-factory';

export class RubikHexahedron4x4Factory extends ARubikCubeFactory<THexahedronFilenames> {
  public get commonName(): string {
    return '4x4 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<THexahedronFilenames> {
    return new RubikHexahedron4x4PiecesData();
  }
}

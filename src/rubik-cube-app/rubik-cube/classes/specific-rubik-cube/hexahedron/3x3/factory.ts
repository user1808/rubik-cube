import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron3x3PiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../../rubik-cube/helpers/rubik-cube-factory';

export class RubikHexahedron3x3Factory extends ARubikCubeFactory<THexahedronFilenames> {
  public get commonName(): string {
    return '3x3 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<THexahedronFilenames> {
    return new RubikHexahedron3x3PiecesData();
  }
}

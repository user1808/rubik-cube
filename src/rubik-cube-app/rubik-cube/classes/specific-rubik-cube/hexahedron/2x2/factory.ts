import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron2x2PiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../../rubik-cube/helpers/rubik-cube-factory';

export class RubikHexahedron2x2Factory extends ARubikCubeFactory<THexahedronFilenames> {
  public get commonName(): string {
    return '2x2 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<THexahedronFilenames> {
    return new RubikHexahedron2x2PiecesData();
  }
}

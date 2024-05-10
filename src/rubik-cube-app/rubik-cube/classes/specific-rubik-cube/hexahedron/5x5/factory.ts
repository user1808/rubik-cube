import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron5x5PiecesData } from './pieces-data';
import { ARubikHexahedronFactory } from '../factory';

export class RubikHexahedron5x5Factory extends ARubikHexahedronFactory {
  public get commonName(): string {
    return '5x5 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<THexahedronFilenames> {
    return new RubikHexahedron5x5PiecesData();
  }
}

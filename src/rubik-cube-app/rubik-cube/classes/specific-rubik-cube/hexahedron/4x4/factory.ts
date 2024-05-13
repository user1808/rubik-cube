import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikHexahedron4x4PiecesData } from './pieces-data';
import { ARubikHexahedronFactory } from '../factory';

export class RubikHexahedron4x4Factory extends ARubikHexahedronFactory {
  public get commonName(): string {
    return '4x4 Cube';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<THexahedronFilenames> {
    return new RubikHexahedron4x4PiecesData();
  }
}
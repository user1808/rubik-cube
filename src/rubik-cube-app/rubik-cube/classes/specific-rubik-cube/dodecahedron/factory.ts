import type { TDodecahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';

export class RubikDodecahedronFactory extends ARubikCubeFactory<TDodecahedronFilenames> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<TDodecahedronFilenames> {
    return new RubikDodecahedronPiecesData();
  }
}

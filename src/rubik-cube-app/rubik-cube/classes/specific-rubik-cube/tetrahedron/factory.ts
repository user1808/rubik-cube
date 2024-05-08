import type { TTetrahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';

export class RubikTetrahedronFactory extends ARubikCubeFactory<TTetrahedronFilenames> {
  public get commonName(): string {
    return 'Pyraminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<TTetrahedronFilenames> {
    return new RubikTetrahedronPiecesData();
  }
}

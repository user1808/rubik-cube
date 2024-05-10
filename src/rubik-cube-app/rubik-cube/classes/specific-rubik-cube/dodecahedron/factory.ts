import type { TDodecahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/filenames';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikDodecahedronMaterials } from './materials';

export class RubikDodecahedronFactory extends ARubikCubeFactory<
  TDodecahedronFilenames,
  TDodecahedronFaces
> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<TDodecahedronFilenames> {
    return new RubikDodecahedronPiecesData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<TDodecahedronFaces> {
    return new RubikDodecahedronMaterials();
  }
}

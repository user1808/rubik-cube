import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikDodecahedronMaterials } from './materials';
import type { TDodecahedronPiecesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/pieces-faces';

export class RubikDodecahedronFactory extends ARubikCubeFactory<
  TDodecahedronPiecesWithFaces,
  TDodecahedronFaces
> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    TDodecahedronPiecesWithFaces,
    TDodecahedronFaces
  > {
    return new RubikDodecahedronPiecesData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<TDodecahedronFaces> {
    return new RubikDodecahedronMaterials();
  }
}

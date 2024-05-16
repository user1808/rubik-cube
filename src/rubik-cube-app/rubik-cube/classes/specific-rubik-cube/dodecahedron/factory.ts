import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import { RubikDodecahedronMaterials } from './materials';
import type { TDodecahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/pieces-faces';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces
> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    TDodecahedronPiecesFilenamesWithFaces,
    TDodecahedronFaces
  > {
    return new RubikDodecahedronPiecesData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TDodecahedronFaces,
    TDodecahedronEdgeFaces
  > {
    return new RubikDodecahedronMaterials();
  }
}

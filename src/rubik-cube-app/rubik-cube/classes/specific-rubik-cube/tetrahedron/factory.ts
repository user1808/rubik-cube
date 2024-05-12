import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { ARubikCubeFactory } from '../../rubik-cube/helpers/rubik-cube-factory';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { TTetrahedronPiecesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/pieces-faces';
import { RubikTetrahedronMaterials } from './materials';

export class RubikTetrahedronFactory extends ARubikCubeFactory<
  TTetrahedronPiecesWithFaces,
  TTetrahedronFaces
> {
  public get commonName(): string {
    return 'Pyraminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    TTetrahedronPiecesWithFaces,
    TTetrahedronFaces
  > {
    return new RubikTetrahedronPiecesData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<TTetrahedronFaces> {
    return new RubikTetrahedronMaterials();
  }
}

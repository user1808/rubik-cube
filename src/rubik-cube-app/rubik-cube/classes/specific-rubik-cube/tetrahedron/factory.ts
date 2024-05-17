import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import type {
  TTetrahedronEdgeFaces,
  TTetrahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { TTetrahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/pieces-faces';
import { RubikTetrahedronMaterials } from './materials';
import type { TTetrahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/rotation-groups';
import type { TTetrahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/rotation-types';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-data';
import { RubikTetrahedronRotationData } from './rotation-data';

export class RubikTetrahedronFactory extends AbstractRubikCubeFactory<
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes
> {
  public get commonName(): string {
    return 'Pyraminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    TTetrahedronPiecesFilenamesWithFaces,
    TTetrahedronFaces,
    TTetrahedronRotationGroups
  > {
    return new RubikTetrahedronPiecesData();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TTetrahedronRotationGroups,
    TTetrahedronRotationTypes
  > {
    return new RubikTetrahedronRotationData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<TTetrahedronFaces, TTetrahedronEdgeFaces> {
    return new RubikTetrahedronMaterials();
  }
}

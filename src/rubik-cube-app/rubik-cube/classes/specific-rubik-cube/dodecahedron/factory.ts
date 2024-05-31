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
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';
import type { TDodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-data';
import { RubikDodecahedronRotationData } from './rotation-data';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes
> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public createRubikCubePiecesData(): IRubikCubePiecesData<
    TDodecahedronPiecesFilenamesWithFaces,
    TDodecahedronFaces,
    TDodecahedronRotationGroups
  > {
    return new RubikDodecahedronPiecesData();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TDodecahedronRotationGroups,
    TDodecahedronRotationTypes
  > {
    return new RubikDodecahedronRotationData();
  }
  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TDodecahedronFaces,
    TDodecahedronEdgeFaces
  > {
    return new RubikDodecahedronMaterials();
  }
}

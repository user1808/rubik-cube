import { RubikDodecahedronPiecesData } from './pieces-data';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { RubikDodecahedronMaterials } from './materials';
import type { TDodecahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/pieces-faces';
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';
import type { TDodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';
import { RubikDodecahedronRotationData } from './rotation-data';
import type {
  IRubikCubeShellData,
  IRubikCubeRotationData,
  IRubikCubePiecesData,
  IRubikCubeMaterials,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  'TODO',
  'TODO'
> {
  public get commonName(): string {
    return 'Megaminx';
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    TDodecahedronRotationGroups,
    TDodecahedronRotationTypes,
    'TODO',
    'TODO'
  > {
    throw new Error('Method not implemented.');
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

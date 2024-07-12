import type { TDodecahedronPiecesFilenamesWithFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/pieces-faces';
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';
import type { TDodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type {
  IRubikCubeShellData,
  IRubikCubeRotationData,
  IRubikCubePiecesData,
  IRubikCubeMaterials,
  IRubikCubeRotationGroupsData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikDodecahedronRotationData } from './rotation-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikDodecahedronMaterials } from './materials';
import { RubikDodecahedronRotationGroupsData } from './rotation-groups-data';

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
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    TDodecahedronPiecesFilenamesWithFaces,
    TDodecahedronFaces
  > {
    return new RubikDodecahedronPiecesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TDodecahedronRotationGroups> {
    return new RubikDodecahedronRotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    TDodecahedronRotationGroups,
    TDodecahedronRotationTypes
  > {
    return new RubikDodecahedronRotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    TDodecahedronRotationGroups,
    TDodecahedronRotationTypes,
    'TODO',
    'TODO'
  > {
    throw new Error('Method not implemented.');
  }
  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    TDodecahedronFaces,
    TDodecahedronEdgeFaces
  > {
    return new RubikDodecahedronMaterials();
  }
}

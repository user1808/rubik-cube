import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikDodecahedronRotationData } from './rotation-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { RubikDodecahedronMaterials } from './materials';
import { RubikDodecahedronRotationGroupsData } from './rotation-groups-data';
import { RubikDodecahedronShellData } from './shell-data';
import { RubikDodecahedronFacesData } from './faces-data';
import type { TCubeCommonName } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilenames,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type {
  IRubikCubeShellData,
  IRubikCubeRotationData,
  IRubikCubePiecesData,
  IRubikCubeMaterials,
  IRubikCubeRotationGroupsData,
  IRubikCubeFacesData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilenames
> {
  public get commonName(): TCubeCommonName {
    return 'Megaminx';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    TDodecahedronPiecesFilenamesWithFaces,
    TDodecahedronFaces
  > {
    return new RubikDodecahedronPiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<TDodecahedronFaces> {
    return new RubikDodecahedronFacesData();
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
    TDodecahedronShellFilenames
  > {
    return new RubikDodecahedronShellData();
  }
  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    TDodecahedronFaces,
    TDodecahedronEdgeFaces
  > {
    return new RubikDodecahedronMaterials();
  }
}

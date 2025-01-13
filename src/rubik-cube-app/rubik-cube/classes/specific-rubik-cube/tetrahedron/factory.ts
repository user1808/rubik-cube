import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { RubikTetrahedronMaterials } from './materials';
import { RubikTetrahedronRotationData } from './rotation-data';
import { RubikTetrahedronShellData } from './shell-data';
import { RubikTetrahedronRotationGroupsData } from './rotation-groups-data';
import { RubikTetrahedronFacesData } from './faces-data';
import type {
  IRubikCubeFacesData,
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type {
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilenames,
  TTetrahedronCommonName,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronFactory extends AbstractRubikCubeFactory<
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronCommonName,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilenames
> {
  public override get commonName(): TTetrahedronCommonName {
    return 'Pyraminx';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    TTetrahedronPiecesFilenamesWithFaces,
    TTetrahedronFaces
  > {
    return new RubikTetrahedronPiecesData();
  }
  public override createRubikCubeFacesData(): IRubikCubeFacesData<TTetrahedronFaces> {
    return new RubikTetrahedronFacesData();
  }
  public override createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TTetrahedronRotationGroups> {
    return new RubikTetrahedronRotationGroupsData();
  }
  public override createRubikCubeRotationData(): IRubikCubeRotationData<
    TTetrahedronRotationGroups,
    TTetrahedronRotationTypes
  > {
    return new RubikTetrahedronRotationData();
  }
  public override createRubikCubeShellData(): IRubikCubeShellData<
    TTetrahedronRotationGroups,
    TTetrahedronRotationTypes,
    TTetrahedronShellFilenames
  > {
    return new RubikTetrahedronShellData();
  }
  public override createRubikCubeMaterials(): IRubikCubeMaterials<
    TTetrahedronFaces,
    TTetrahedronEdgeFaces
  > {
    return new RubikTetrahedronMaterials();
  }
}

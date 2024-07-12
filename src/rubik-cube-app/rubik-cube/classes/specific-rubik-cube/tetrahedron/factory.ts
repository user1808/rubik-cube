import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { RubikTetrahedronMaterials } from './materials';
import { RubikTetrahedronRotationData } from './rotation-data';
import { RubikTetrahedronShellData } from './shell-data';
import type {
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
  TTetrahedronShellPieces,
  TTetrahedronShellFilename,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { RubikTetrahedronRotationGroupsData } from './rotation-groups-data';

export class RubikTetrahedronFactory extends AbstractRubikCubeFactory<
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilename,
  TTetrahedronShellPieces
> {
  public override get commonName(): string {
    return 'Pyraminx';
  }
  public override createRubikCubePiecesData(): IRubikCubePiecesData<
    TTetrahedronPiecesFilenamesWithFaces,
    TTetrahedronFaces
  > {
    return new RubikTetrahedronPiecesData();
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
    TTetrahedronShellFilename,
    TTetrahedronShellPieces
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

import type {
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilename,
  TDodecahedronShellPieces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron';
import type {
  IRubikCubeShellData,
  IRubikCubeRotationData,
  IRubikCubePiecesData,
  IRubikCubeMaterials,
  IRubikCubeRotationGroupsData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikDodecahedronRotationData } from './rotation-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { RubikDodecahedronMaterials } from './materials';
import { RubikDodecahedronRotationGroupsData } from './rotation-groups-data';
import { RubikDodecahedronShellData } from './shell-data';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilename,
  TDodecahedronShellPieces
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
    TDodecahedronShellFilename,
    TDodecahedronShellPieces
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

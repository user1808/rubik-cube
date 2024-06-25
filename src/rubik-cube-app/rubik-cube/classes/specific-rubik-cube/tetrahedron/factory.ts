import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikTetrahedronPiecesData } from './pieces-data';
import { RubikTetrahedronMaterials } from './materials';
import { RubikTetrahedronRotationData } from './rotation-data';
import { RubikTetrahedronShellData } from './shell-data';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
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

export class RubikTetrahedronFactory extends AbstractRubikCubeFactory<
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilename,
  TTetrahedronShellPieces
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
  public createRubikCubeShellData(): IRubikCubeShellData<
    TTetrahedronRotationGroups,
    TTetrahedronRotationTypes,
    TTetrahedronShellFilename,
    TTetrahedronShellPieces
  > {
    return new RubikTetrahedronShellData();
  }
}

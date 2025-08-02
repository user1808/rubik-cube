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
  TTetrahedronFacesTextsFilename,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { TetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import { TetrahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/rotation-types';

export class RubikTetrahedronFactory extends AbstractRubikCubeFactory<
  TTetrahedronPiecesFilenamesWithFaces,
  TTetrahedronCommonName,
  TTetrahedronFaces,
  TTetrahedronEdgeFaces,
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
  TTetrahedronShellFilenames,
  TTetrahedronFacesTextsFilename
> {
  public override readonly commonName: TTetrahedronCommonName = 'Pyraminx';
  public override readonly cameraMinDistance: number = 1.2 * Math.sqrt(6);
  public override readonly facesNames: Readonly<Array<TTetrahedronFaces>> = TetrahedronFaces;
  public override readonly rotationTypesNames: Readonly<Array<TTetrahedronRotationTypes>> =
    TetrahedronRotationTypes;
  public override readonly facesTextsFilename: TTetrahedronFacesTextsFilename =
    'RubikTetrahedronFacesTexts.glb';

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

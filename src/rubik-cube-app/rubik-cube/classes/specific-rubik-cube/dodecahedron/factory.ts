import { AbstractRubikCubeFactory } from '../../rubik-cube/rubik-cube-factory';
import { RubikDodecahedronRotationData } from './rotation-data';
import { RubikDodecahedronPiecesData } from './pieces-data';
import { RubikDodecahedronMaterials } from './materials';
import { RubikDodecahedronRotationGroupsData } from './rotation-groups-data';
import { RubikDodecahedronShellData } from './shell-data';
import { RubikDodecahedronFacesData } from './faces-data';
import type {
  TDodecahedronCommonName,
  TDodecahedronEdgeFaces,
  TDodecahedronFaces,
  TDodecahedronFacesTextsFilename,
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
import { DodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';
import { DodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';

export class RubikDodecahedronFactory extends AbstractRubikCubeFactory<
  TDodecahedronPiecesFilenamesWithFaces,
  TDodecahedronCommonName,
  TDodecahedronFaces,
  TDodecahedronEdgeFaces,
  TDodecahedronRotationGroups,
  TDodecahedronRotationTypes,
  TDodecahedronShellFilenames,
  TDodecahedronFacesTextsFilename
> {
  public override readonly commonName: TDodecahedronCommonName = 'Megaminx';
  public override readonly cameraMinDistance: number = 0.5 * Math.sqrt(3) * (1 + Math.sqrt(5));
  public override readonly rotationGroups: Readonly<Array<TDodecahedronRotationGroups>> =
    DodecahedronRotationGroups;
  public override readonly rotationTypesNames: Readonly<Array<TDodecahedronRotationTypes>> =
    DodecahedronRotationTypes;
  public override readonly facesTextsFilename: TDodecahedronFacesTextsFilename =
    'RubikDodecahedronFacesTexts.glb';

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

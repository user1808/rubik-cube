import type { Scene, PerspectiveCamera } from 'three';
import type { IRubikCube } from '../../../interfaces/structure';
import type { IRubikCubeRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type {
  IRubikCubeBuilder,
  IRubikCubePiecesBuilder,
  IRubikCubeRotationGroupsBuilder,
  IRubikCubeShellBuilder,
} from '../../../interfaces/builders';
import { RubikCube } from '../structure/cube/rubik-cube';
import type { IRubikCubeFacesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-faces-builder';
import type { IRubikCubeFacesTextsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-faces-texts-builder';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { IRubikCubeProperties } from '@/rubik-cube-app/rubik-cube/interfaces/structure/cube/rubik-cube';

type RubikCubeBuilderProperties<
  TCubeCommonName extends TCubeCommonNames,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationTypes extends string,
> = Omit<
  IRubikCubeProperties<TCubeCommonName, TCubeFacesNames, TCubeEdgeFacesNames, TCubeRotationTypes>,
  'piecesMaterials'
>;

export class RubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeCommonName extends TCubeCommonNames,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames,
      TCubePiecesFilenames
    >
{
  constructor(
    private readonly properties: RubikCubeBuilderProperties<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationTypes
    >,
    private readonly scene: Scene,
    private readonly camera: PerspectiveCamera,
    private readonly cubeShellBuilder: IRubikCubeShellBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
    private readonly cubePiecesBuilder: IRubikCubePiecesBuilder<
      TCubeFacesNames,
      TCubeEdgeFacesNames
    >,
    private readonly cubeFacesBuilder: IRubikCubeFacesBuilder<TCubeFacesNames>,
    private readonly cubeRotationGroupsBuilder: IRubikCubeRotationGroupsBuilder<
      TCubeFacesNames,
      TCubeRotationGroups
    >,
    private readonly cubeFacesTextsBuilder: IRubikCubeFacesTextsBuilder,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {}

  public async buildCube(): Promise<
    IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
  > {
    const cubeShell = await this.cubeShellBuilder.buildShell();
    const cubePieces = await this.cubePiecesBuilder.buildPieces();
    const cubePiecesMaterials = this.cubePiecesBuilder.materials;
    const cubeFaces = this.cubeFacesBuilder.buildFaces(cubePieces);
    const cubeRotationGroups = this.cubeRotationGroupsBuilder.buildRotationGroups(cubePieces);
    const cubeFacesTexts = await this.cubeFacesTextsBuilder.buildFacesTexts();

    return new RubikCube(
      {
        ...this.properties,
        piecesMaterials: cubePiecesMaterials,
      },
      this.scene,
      this.camera,
      cubeShell,
      cubePieces,
      cubeFaces,
      cubeRotationGroups,
      cubeFacesTexts,
      this.rotationImplementation,
    );
  }
}

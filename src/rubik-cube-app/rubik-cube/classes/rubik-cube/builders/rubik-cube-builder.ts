import * as THREE from 'three';
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

export class RubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces,
      TCubePiecesFilenames
    >
{
  constructor(
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly cubeShellBuilder: IRubikCubeShellBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    private readonly cubePiecesBuilder: IRubikCubePiecesBuilder<TCubeFacesNames>,
    private readonly cubeFacesBuilder: IRubikCubeFacesBuilder<TCubeFacesNames>,
    private readonly cubeRotationGroupsBuilder: IRubikCubeRotationGroupsBuilder<
      TCubeFacesNames,
      TCubeRotationGroups
    >,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ) {}

  public async buildCube(): Promise<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
  > {
    const cubeShell = await this.cubeShellBuilder.buildShell();
    const cubePieces = await this.cubePiecesBuilder.buildPieces();
    const cubeFaces = this.cubeFacesBuilder.buildFaces(cubePieces);
    const cubeRotationGroups = this.cubeRotationGroupsBuilder.buildRotationGroups(cubePieces);

    return new RubikCube(
      this.scene,
      this.camera,
      cubeShell,
      cubePieces,
      cubeFaces,
      cubeRotationGroups,
      this.rotationImplementation,
    );
  }
}

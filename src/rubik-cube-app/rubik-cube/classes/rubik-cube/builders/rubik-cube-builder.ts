import * as THREE from 'three';
import type { IRubikCubeRotationData } from '../../../interfaces/data';
import type {
  IRubikCubeBuilder,
  IRubikCubePiecesBuilder,
  IRubikCubeRotationGroupsBuilder,
  IRubikCubeShellBuilder,
} from '../../../interfaces/builders';
import type { IRubikCube } from '../../../interfaces/structure';
import type { IRubikCubeRotationImplementation } from '../../../interfaces/rubik-cube-rotation-implementation';
import { RubikCube } from '../structure/cube/rubik-cube';

export class RubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces,
      TCubePiecesFilenames
    >
{
  constructor(
    private readonly scene: THREE.Scene,
    private readonly cubeShellBuilder: IRubikCubeShellBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    private readonly cubePiecesBuilder: IRubikCubePiecesBuilder,
    private readonly cubeRotationGroupsBuilder: IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>,
    private readonly rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ) {}

  public buildCube(): IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    const cubeShell = this.cubeShellBuilder.buildShell();
    const cubePieces = this.cubePiecesBuilder.buildPieces();
    const cubeRotationGroups = this.cubeRotationGroupsBuilder.buildRotationGroups(cubePieces);

    return new RubikCube(
      this.scene,
      cubeShell,
      cubePieces,
      cubeRotationGroups,
      Object.keys(this.rotationData.rotationGroupsNewIdxs) as Array<TCubeRotationTypes>,
      this.rotationImplementation,
    );
  }
}

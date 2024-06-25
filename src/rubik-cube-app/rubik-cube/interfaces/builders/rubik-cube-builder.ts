import * as THREE from 'three';
import type { IRubikCubeRotationImplementation } from '../rubik-cube-rotation-implementation';
import type { IRubikCubeShellData } from '../data/rubik-cube-shell-data';
import type { IRubikCubeMaterials, IRubikCubePiecesData, IRubikCubeRotationData } from '../data';
import type { IRubikCube } from '../structure';
import type { IRubikCubeGLTFLoader } from '../rubik-cube-gltf-loader';
import type { IRubikCubePieceBuilder } from '.';

export interface IRubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  buildCube(
    scene: THREE.Scene,
    gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
    pieceBuilder: IRubikCubePieceBuilder<TCubePiecesFilenamesWithFaces, TCubeFaces, TCubeEdgeFaces>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
    cubeShellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
    piecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups
    >,
    rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    rotationImplementation: IRubikCubeRotationImplementation<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>>;
}

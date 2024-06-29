import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeShell } from '../structure';
import type { IRubikCubeShellData } from '../data';

export interface IRubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
> {
  buildShell(
    loadedGLTFCubeShell: GLTF,
    cubeShellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
  ): IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
}

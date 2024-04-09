import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';

type TRubikCubeFileNames = 'RubikCubePiece.glb';

export class CustomGLTFLoader extends GLTFLoader {
  load(
    url: TRubikCubeFileNames,
    onLoad?: ((data: GLTF) => void) | undefined,
    onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined,
    onError?: ((err: unknown) => void) | undefined,
  ): void {
    super.load(url, onLoad, onProgress, onError);
  }
}

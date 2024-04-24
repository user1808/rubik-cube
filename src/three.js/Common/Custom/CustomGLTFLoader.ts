import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';

type TRubikCubeFileNames = 'RubikCubePiece.glb';

export class CustomGLTFLoader extends GLTFLoader {
  public static readonly FOLDER_WITH_MODELS: string = 'models/';

  load(
    fileName: string,
    onLoad?: ((data: GLTF) => void) | undefined,
    onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined,
    onError?: ((err: unknown) => void) | undefined,
  ): void {
    super.load(`${CustomGLTFLoader.FOLDER_WITH_MODELS}${fileName}`, onLoad, onProgress, onError);
  }
}

import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';

export class RubikCubePieceLoader<TRubikCubePiecesNames extends string> extends GLTFLoader {
  public static readonly FOLDER_WITH_MODELS: string = 'models/';

  // TODO: handle loading several files
  load(
    fileName: TRubikCubePiecesNames,
    onLoad?: (data: GLTF) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void,
  ): void {
    super.load(
      `${RubikCubePieceLoader.FOLDER_WITH_MODELS}${fileName}`,
      onLoad,
      onProgress,
      onError,
    );
  }
}

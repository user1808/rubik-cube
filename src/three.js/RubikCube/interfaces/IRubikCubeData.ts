import type { TRubikCubeBasicData } from '../types/RubikCubePieceBasicData';

export interface IRubikCubeData<FaceNames extends string> {
  get cubePiecesBasicData(): Array<TRubikCubeBasicData>;
  get cubeFacePiecesIdxs(): Record<FaceNames, Array<number>>;
}

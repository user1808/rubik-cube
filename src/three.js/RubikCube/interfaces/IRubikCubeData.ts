import type { TRubikCubePieceBasicData } from '../types/common/TRubikCubePieceBasicData';

export interface IRubikCubeData<FaceNames extends string> {
  get cubePiecesBasicData(): Array<TRubikCubePieceBasicData>;
  get cubeFacePiecesIdxs(): Record<FaceNames, Array<number>>;
}

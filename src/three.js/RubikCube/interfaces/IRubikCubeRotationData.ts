import type { TRubikCubeFaceRotationAxis } from '../types/common/TRubikCubeFaceRotationAxis';
import type { TRubikCubeFaceRotationData } from '../types/common/TRubikCubeFaceRotationData';

export interface IRubikCubeRotationData<FaceNames extends string, RotationTypes extends string> {
  get facesRotationAxes(): Record<FaceNames, TRubikCubeFaceRotationAxis>;
  get rotationsBasicData(): Record<RotationTypes, TRubikCubeFaceRotationData>;
}

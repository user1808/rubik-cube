import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { TRubikCubeFaceRotationAxis } from '../../types/common/TRubikCubeFaceRotationAxis';
import type { TRubikCubeFaceRotationData } from '../../types/common/TRubikCubeFaceRotationData';

export class RubikCube3x3RotationData
  implements IRubikCubeRotationData<TRubikCube3x3FaceNames, TRubikCube3x3RotationTypes>
{
  private readonly _facesRotationAxes: typeof this.facesRotationAxes = {
    TopFace: { axis: 'y', turn: 1 },
    DownFace: { axis: 'y', turn: -1 },
    LeftFace: { axis: 'x', turn: -1 },
    RightFace: { axis: 'x', turn: 1 },
    FrontFace: { axis: 'z', turn: 1 },
    BackFace: { axis: 'z', turn: -1 },
    SliceXFace: { axis: 'x', turn: 1 },
    SliceYFace: { axis: 'y', turn: 1 },
    SliceZFace: { axis: 'z', turn: 1 },
  };

  private readonly _rotationBasicData: typeof this.rotationsBasicData = {
    CounterClockwise: {
      angle: 0.5 * Math.PI,
      swapPiecesIdxs: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      duration: 1,
    },
    Clockwise: {
      angle: -0.5 * Math.PI,
      swapPiecesIdxs: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      duration: 1,
    },
    DoubleTurn: {
      angle: Math.PI,
      swapPiecesIdxs: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      duration: 2,
    },
  };

  get facesRotationAxes(): Record<TRubikCube3x3FaceNames, TRubikCubeFaceRotationAxis> {
    return this._facesRotationAxes;
  }
  get rotationsBasicData(): Record<TRubikCube3x3RotationTypes, TRubikCubeFaceRotationData> {
    return this._rotationBasicData;
  }
}

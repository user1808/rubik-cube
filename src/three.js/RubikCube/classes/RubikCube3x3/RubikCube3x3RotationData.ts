import type {
  IRubikCubeRotationData,
  TRubikCubeFaceRotationAxis,
  TRubikCubeFaceRotationData,
} from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube3x3PseudoFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import type { TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';

export class RubikCube3x3RotationData
  implements
    IRubikCubeRotationData<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3RotationTypes
    >
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
      rotatedFaceNewPiecesIdxs: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      durationInSeconds: 1,
    },
    Clockwise: {
      angle: -0.5 * Math.PI,
      rotatedFaceNewPiecesIdxs: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      durationInSeconds: 1,
    },
    DoubleTurn: {
      angle: Math.PI,
      rotatedFaceNewPiecesIdxs: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      durationInSeconds: 2,
    },
  };

  public get facesRotationAxes(): Record<
    TRubikCube3x3RealFacesNames | TRubikCube3x3PseudoFacesNames,
    TRubikCubeFaceRotationAxis
  > {
    return this._facesRotationAxes;
  }

  public get rotationsBasicData(): Record<TRubikCube3x3RotationTypes, TRubikCubeFaceRotationData> {
    return this._rotationBasicData;
  }
}

import type {
  IRubikCubeRotationData,
  TRubikCubeFaceRotationAxis,
  TRubikCubeFaceRotationData,
} from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import type { TRubikCube2x2RotationTypes } from '../../types/RubikCube2x2/TRubikCube2x2RotationTypes';

export class RubikCube2x2RotationData
  implements
    IRubikCubeRotationData<
      TRubikCube2x2RealFacesNames,
      TRubikCube2x2PseudoFacesNames,
      TRubikCube2x2RotationTypes
    >
{
  private readonly _facesRotationAxes: typeof this.facesRotationAxes = {
    TopFace: { axis: 'y', turn: 1 },
    DownFace: { axis: 'y', turn: -1 },
    LeftFace: { axis: 'x', turn: -1 },
    RightFace: { axis: 'x', turn: 1 },
    FrontFace: { axis: 'z', turn: 1 },
    BackFace: { axis: 'z', turn: -1 },
  };

  private readonly _rotationBasicData: typeof this.rotationsBasicData = {
    CounterClockwise: {
      angle: 0.5 * Math.PI,
      rotatedFaceNewPiecesIdxs: [1, 3, 0, 2],
      durationInSeconds: 1,
    },
    Clockwise: {
      angle: -0.5 * Math.PI,
      rotatedFaceNewPiecesIdxs: [2, 0, 3, 1],
      durationInSeconds: 1,
    },
    DoubleTurn: {
      angle: Math.PI,
      rotatedFaceNewPiecesIdxs: [3, 2, 1, 0],
      durationInSeconds: 2,
    },
  };

  public get facesRotationAxes(): Record<
    TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames,
    TRubikCubeFaceRotationAxis
  > {
    return this._facesRotationAxes;
  }
  public get rotationsBasicData(): Record<TRubikCube2x2RotationTypes, TRubikCubeFaceRotationData> {
    return this._rotationBasicData;
  }
}

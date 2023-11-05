import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { TRubikCubeFaceAffectedByRotationData } from '../../types/common/TRubikCubeFaceAffectedByRotationData';
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

  private readonly _facesAffectedByRotationData: typeof this.facesAffectedByRotationData = {
    TopFace: {
      Clockwise: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'RightFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'LeftFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'BackFace',
          faceToIdxs: [0, 1, 2],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'LeftFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'RightFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'BackFace',
          faceToIdxs: [0, 1, 2],
        },
      ],
      DoubleTurn: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'BackFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'RightFace',
          faceToIdxs: [0, 1, 2],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'LeftFace',
          faceToIdxs: [0, 1, 2],
        },
      ],
    },
    DownFace: {
      Clockwise: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'LeftFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'FrontFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'RightFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'BackFace',
          faceToIdxs: [6, 7, 8],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'RightFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'FrontFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'LeftFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'BackFace',
          faceToIdxs: [6, 7, 8],
        },
      ],
      DoubleTurn: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'FrontFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'BackFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'RightFace',
          faceToIdxs: [6, 7, 8],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'LeftFace',
          faceToIdxs: [6, 7, 8],
        },
      ],
    },
    FrontFace: {
      Clockwise: [
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [6, 7, 8],
          faceTo: 'RightFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'DownFace',
          faceToIdxs: [2, 1, 0],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [2, 1, 0],
          faceTo: 'LeftFace',
          faceToIdxs: [8, 5, 2],
        },
        { faceFrom: 'LeftFace', faceFromIdxs: [8, 5, 2], faceTo: 'TopFace', faceToIdxs: [6, 7, 8] },
      ],
      CounterClockwise: [
        { faceFrom: 'TopFace', faceFromIdxs: [6, 7, 8], faceTo: 'LeftFace', faceToIdxs: [8, 5, 2] },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [8, 5, 2],
          faceTo: 'DownFace',
          faceToIdxs: [2, 1, 0],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [2, 1, 0],
          faceTo: 'RightFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'TopFace',
          faceToIdxs: [6, 7, 8],
        },
      ],
      DoubleTurn: [
        { faceFrom: 'TopFace', faceFromIdxs: [6, 7, 8], faceTo: 'DownFace', faceToIdxs: [2, 1, 0] },
        { faceFrom: 'DownFace', faceFromIdxs: [2, 1, 0], faceTo: 'TopFace', faceToIdxs: [6, 7, 8] },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'LeftFace',
          faceToIdxs: [8, 5, 2],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [8, 5, 2],
          faceTo: 'RightFace',
          faceToIdxs: [0, 3, 6],
        },
      ],
    },
    BackFace: {
      Clockwise: [
        { faceFrom: 'TopFace', faceFromIdxs: [0, 1, 2], faceTo: 'LeftFace', faceToIdxs: [6, 3, 0] },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [6, 3, 0],
          faceTo: 'DownFace',
          faceToIdxs: [8, 7, 6],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [8, 7, 6],
          faceTo: 'RightFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'TopFace',
          faceToIdxs: [0, 1, 2],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [0, 1, 2],
          faceTo: 'RightFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'DownFace',
          faceToIdxs: [8, 7, 6],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [8, 7, 6],
          faceTo: 'LeftFace',
          faceToIdxs: [6, 3, 0],
        },
        { faceFrom: 'LeftFace', faceFromIdxs: [6, 3, 0], faceTo: 'TopFace', faceToIdxs: [0, 1, 2] },
      ],
      DoubleTurn: [
        { faceFrom: 'TopFace', faceFromIdxs: [0, 1, 2], faceTo: 'DownFace', faceToIdxs: [8, 7, 6] },
        { faceFrom: 'DownFace', faceFromIdxs: [8, 7, 6], faceTo: 'TopFace', faceToIdxs: [0, 1, 2] },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'LeftFace',
          faceToIdxs: [6, 3, 0],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [6, 3, 0],
          faceTo: 'RightFace',
          faceToIdxs: [2, 5, 8],
        },
      ],
    },
    RightFace: {
      Clockwise: [
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'TopFace',
          faceToIdxs: [2, 5, 8],
        },
        { faceFrom: 'TopFace', faceFromIdxs: [2, 5, 8], faceTo: 'BackFace', faceToIdxs: [6, 3, 0] },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 3, 0],
          faceTo: 'DownFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'FrontFace',
          faceToIdxs: [2, 5, 8],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'DownFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'BackFace',
          faceToIdxs: [6, 3, 0],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 3, 0],
          faceTo: 'TopFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'FrontFace',
          faceToIdxs: [2, 5, 8],
        },
      ],
      DoubleTurn: [
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [6, 3, 0],
          faceTo: 'FrontFace',
          faceToIdxs: [2, 5, 8],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [2, 5, 8],
          faceTo: 'BackFace',
          faceToIdxs: [6, 3, 0],
        },
        { faceFrom: 'DownFace', faceFromIdxs: [2, 5, 8], faceTo: 'TopFace', faceToIdxs: [2, 5, 8] },
        { faceFrom: 'TopFace', faceFromIdxs: [2, 5, 8], faceTo: 'DownFace', faceToIdxs: [2, 5, 8] },
      ],
    },
    LeftFace: {
      Clockwise: [
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'DownFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'BackFace',
          faceToIdxs: [8, 5, 2],
        },
        { faceFrom: 'BackFace', faceFromIdxs: [8, 5, 2], faceTo: 'TopFace', faceToIdxs: [0, 3, 6] },
      ],
      CounterClockwise: [
        { faceFrom: 'TopFace', faceFromIdxs: [0, 3, 6], faceTo: 'BackFace', faceToIdxs: [8, 5, 2] },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [8, 5, 2],
          faceTo: 'DownFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 3, 6],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'TopFace',
          faceToIdxs: [0, 3, 6],
        },
      ],
      DoubleTurn: [
        { faceFrom: 'TopFace', faceFromIdxs: [0, 3, 6], faceTo: 'DownFace', faceToIdxs: [0, 3, 6] },
        { faceFrom: 'DownFace', faceFromIdxs: [0, 3, 6], faceTo: 'TopFace', faceToIdxs: [0, 3, 6] },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [0, 3, 6],
          faceTo: 'BackFace',
          faceToIdxs: [8, 5, 2],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [8, 5, 2],
          faceTo: 'FrontFace',
          faceToIdxs: [0, 3, 6],
        },
      ],
    },
    SliceXFace: {
      Clockwise: [
        { faceFrom: 'TopFace', faceFromIdxs: [1, 4, 7], faceTo: 'BackFace', faceToIdxs: [7, 4, 1] },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [7, 4, 1],
          faceTo: 'DownFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'FrontFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'TopFace',
          faceToIdxs: [1, 4, 7],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'FrontFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'DownFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'BackFace',
          faceToIdxs: [7, 4, 1],
        },
        { faceFrom: 'BackFace', faceFromIdxs: [7, 4, 1], faceTo: 'TopFace', faceToIdxs: [1, 4, 7] },
      ],
      DoubleTurn: [
        { faceFrom: 'TopFace', faceFromIdxs: [1, 4, 7], faceTo: 'DownFace', faceToIdxs: [1, 4, 7] },
        { faceFrom: 'DownFace', faceFromIdxs: [1, 4, 7], faceTo: 'TopFace', faceToIdxs: [1, 4, 7] },
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'BackFace',
          faceToIdxs: [7, 4, 1],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [7, 4, 1],
          faceTo: 'FrontFace',
          faceToIdxs: [1, 4, 7],
        },
      ],
    },
    SliceYFace: {
      Clockwise: [
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'LeftFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'BackFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'RightFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'FrontFace',
          faceToIdxs: [3, 4, 5],
        },
      ],
      CounterClockwise: [
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'RightFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'BackFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'LeftFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'FrontFace',
          faceToIdxs: [3, 4, 5],
        },
      ],
      DoubleTurn: [
        {
          faceFrom: 'FrontFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'BackFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'BackFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'FrontFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'LeftFace',
          faceToIdxs: [3, 4, 5],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'RightFace',
          faceToIdxs: [3, 4, 5],
        },
      ],
    },
    SliceZFace: {
      Clockwise: [
        {
          faceFrom: 'TopFace',
          faceFromIdxs: [3, 4, 5],
          faceTo: 'RightFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'DownFace',
          faceToIdxs: [5, 4, 3],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [5, 4, 3],
          faceTo: 'LeftFace',
          faceToIdxs: [7, 4, 1],
        },
        { faceFrom: 'LeftFace', faceFromIdxs: [7, 4, 1], faceTo: 'TopFace', faceToIdxs: [3, 4, 5] },
      ],
      CounterClockwise: [
        { faceFrom: 'TopFace', faceFromIdxs: [3, 4, 5], faceTo: 'LeftFace', faceToIdxs: [7, 4, 1] },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [7, 4, 1],
          faceTo: 'DownFace',
          faceToIdxs: [5, 4, 3],
        },
        {
          faceFrom: 'DownFace',
          faceFromIdxs: [5, 4, 3],
          faceTo: 'RightFace',
          faceToIdxs: [1, 4, 7],
        },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'TopFace',
          faceToIdxs: [3, 4, 5],
        },
      ],
      DoubleTurn: [
        { faceFrom: 'TopFace', faceFromIdxs: [3, 4, 5], faceTo: 'DownFace', faceToIdxs: [5, 4, 3] },
        { faceFrom: 'DownFace', faceFromIdxs: [5, 4, 3], faceTo: 'TopFace', faceToIdxs: [3, 4, 5] },
        {
          faceFrom: 'RightFace',
          faceFromIdxs: [1, 4, 7],
          faceTo: 'LeftFace',
          faceToIdxs: [7, 4, 1],
        },
        {
          faceFrom: 'LeftFace',
          faceFromIdxs: [7, 4, 1],
          faceTo: 'RightFace',
          faceToIdxs: [1, 4, 7],
        },
      ],
    },
  };

  public get facesRotationAxes(): Record<TRubikCube3x3FaceNames, TRubikCubeFaceRotationAxis> {
    return this._facesRotationAxes;
  }
  public get rotationsBasicData(): Record<TRubikCube3x3RotationTypes, TRubikCubeFaceRotationData> {
    return this._rotationBasicData;
  }
  get facesAffectedByRotationData(): Record<
    TRubikCube3x3FaceNames,
    Record<
      TRubikCube3x3RotationTypes,
      Array<TRubikCubeFaceAffectedByRotationData<TRubikCube3x3FaceNames>>
    >
  > {
    return this._facesAffectedByRotationData;
  }
}

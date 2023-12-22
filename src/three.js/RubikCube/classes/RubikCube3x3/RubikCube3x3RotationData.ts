import * as THREE from 'three';
import type {
  IRubikCubeRotationData,
  TRubikCubeFaceRotationData,
} from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube3x3PseudoFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import type { TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';

export class RubikCube3x3RotationData
  implements
    IRubikCubeRotationData<
      TRubikCube3x3RealFacesNames | TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3RotationTypes
    >
{
  private readonly _standardFaceRotationData: TRubikCubeFaceRotationData<TRubikCube3x3RotationTypes>['rotationData'] =
    {
      Clockwise: {
        rotationSteps: [{ angle: -0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [6, 3, 0, 7, 4, 1, 8, 5, 2],
        durationInSeconds: 1,
        precisionOfUpdatedPiecePosition: 2,
      },
      CounterClockwise: {
        rotationSteps: [{ angle: 0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [2, 5, 8, 1, 4, 7, 0, 3, 6],
        durationInSeconds: 1,
        precisionOfUpdatedPiecePosition: 2,
      },
      DoubleTurn: {
        rotationSteps: [{ angle: 0.5 * Math.PI, ease: 'power1.in' }, { angle: 0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [8, 7, 6, 5, 4, 3, 2, 1, 0],
        durationInSeconds: 2,
        precisionOfUpdatedPiecePosition: 2,
      },
    };

  private readonly _rotationBasicData: typeof this.rotationData = {
    TopFace: {
      rotationAxis: new THREE.Vector3(0, 1, 0),
      rotationData: this._standardFaceRotationData,
    },
    DownFace: {
      rotationAxis: new THREE.Vector3(0, -1, 0),
      rotationData: this._standardFaceRotationData,
    },
    FrontFace: {
      rotationAxis: new THREE.Vector3(0, 0, 1),
      rotationData: this._standardFaceRotationData,
    },
    BackFace: {
      rotationAxis: new THREE.Vector3(0, 0, -1),
      rotationData: this._standardFaceRotationData,
    },
    RightFace: {
      rotationAxis: new THREE.Vector3(1, 0, 0),
      rotationData: this._standardFaceRotationData,
    },
    LeftFace: {
      rotationAxis: new THREE.Vector3(-1, 0, 0),
      rotationData: this._standardFaceRotationData,
    },
    SliceXFace: {
      rotationAxis: new THREE.Vector3(1, 0, 0),
      rotationData: this._standardFaceRotationData,
    },
    SliceYFace: {
      rotationAxis: new THREE.Vector3(0, 1, 0),
      rotationData: this._standardFaceRotationData,
    },
    SliceZFace: {
      rotationAxis: new THREE.Vector3(0, 0, 1),
      rotationData: this._standardFaceRotationData,
    },
  };

  public get rotationData(): Record<
    TRubikCube3x3RealFacesNames | TRubikCube3x3PseudoFacesNames,
    TRubikCubeFaceRotationData<TRubikCube3x3RotationTypes>
  > {
    return this._rotationBasicData;
  }
}

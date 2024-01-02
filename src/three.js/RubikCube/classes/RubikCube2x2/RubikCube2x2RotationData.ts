import * as THREE from 'three';
import type {
  IRubikCubeRotationData,
  TRubikCubeFaceRotationData,
} from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import type { TRubikCube2x2RotationTypes } from '../../types/RubikCube2x2/TRubikCube2x2RotationTypes';

export class RubikCube2x2RotationData
  implements
    IRubikCubeRotationData<
      TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames,
      TRubikCube2x2RotationTypes
    >
{
  private readonly _standardFaceRotationData: TRubikCubeFaceRotationData<TRubikCube2x2RotationTypes>['rotationData'] =
    {
      Clockwise: {
        rotationSteps: [{ angle: -0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [2, 0, 3, 1],
        durationInSeconds: 1,
        precisionOfUpdatedPiecePosition: 2,
      },
      CounterClockwise: {
        rotationSteps: [{ angle: 0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [1, 3, 0, 2],
        durationInSeconds: 1,
        precisionOfUpdatedPiecePosition: 2,
      },
      DoubleTurn: {
        rotationSteps: [{ angle: 0.5 * Math.PI, ease: 'power1.in' }, { angle: 0.5 * Math.PI }],
        rotatedFaceNewPiecesIdxs: [3, 2, 1, 0],
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
  };

  public get rotationData(): Record<
    TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames,
    TRubikCubeFaceRotationData<TRubikCube2x2RotationTypes>
  > {
    return this._rotationBasicData;
  }
}

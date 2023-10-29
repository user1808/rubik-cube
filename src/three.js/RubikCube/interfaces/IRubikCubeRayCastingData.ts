import * as THREE from 'three';
import type { TRubikCubeSelectedFaceRotationType } from '../types/common/TRubikCubeSelectedFaceRotationType';

export interface IRubikCubeRayCastingData<FaceNames extends string, RotationTypes extends string> {
  get faceSelectionConditions(): Record<
    FaceNames,
    (selectedPieceFaceIntersection: THREE.Intersection) => boolean
  >;
  get selectedFaceRotationTypes(): Record<
    FaceNames,
    Array<TRubikCubeSelectedFaceRotationType<FaceNames, RotationTypes>>
  >;
}

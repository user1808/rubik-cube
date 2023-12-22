import * as THREE from 'three';

type TRubikCubeFaceRotationSteps = {
  angle: number;
  ease?: string;
};
type TRubikCubeFaceSpecificRotationData = {
  rotationSteps: Array<TRubikCubeFaceRotationSteps>;
  durationInSeconds: number;
  rotatedFaceNewPiecesIdxs: Array<number>;
  precisionOfUpdatedPiecePosition: number;
};
export type TRubikCubeFaceRotationData<RotationTypes extends string> = {
  rotationAxis: THREE.Vector3;
  rotationData: Record<RotationTypes, TRubikCubeFaceSpecificRotationData>;
};

export interface IRubikCubeRotationData<FacesNames extends string, RotationTypes extends string> {
  get rotationData(): Record<FacesNames, TRubikCubeFaceRotationData<RotationTypes>>;
}

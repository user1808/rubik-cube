export type TRubikCubeFaceRotationData = {
  angle: number;
  durationInSeconds: number;
  rotatedFaceNewPiecesIdxs: Array<number>;
};

export type TRubikCubeFaceRotationAxis = {
  axis: 'x' | 'y' | 'z';
  turn: 1 | -1;
};

export interface IRubikCubeRotationData<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
  RotationTypes extends string,
> {
  get facesRotationAxes(): Record<RealFacesNames | PseudoFacesNames, TRubikCubeFaceRotationAxis>;
  get rotationsBasicData(): Record<RotationTypes, TRubikCubeFaceRotationData>;
}

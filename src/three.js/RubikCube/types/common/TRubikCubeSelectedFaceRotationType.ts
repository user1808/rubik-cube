export type TRubikCubeSelectedFaceRotationType<
  FaceNames extends string,
  RotationTypes extends string,
> = {
  faceSelectedPiecesIdxs: Array<number>;
  faceToRotate: FaceNames;
  rotationType: RotationTypes;
};

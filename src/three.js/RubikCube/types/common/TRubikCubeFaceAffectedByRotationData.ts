export type TRubikCubeFaceAffectedByRotationData<FaceName extends string> = {
  faceFrom: FaceName;
  faceFromIdxs: Array<number>;
  faceTo: FaceName;
  faceToIdxs: Array<number>;
};

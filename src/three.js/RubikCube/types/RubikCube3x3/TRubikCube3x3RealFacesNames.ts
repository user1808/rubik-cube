export const RubikCube3x3RealFacesNames = [
  'TopFace',
  'DownFace',
  'FrontFace',
  'BackFace',
  'RightFace',
  'LeftFace',
] as const;

export type TRubikCube3x3RealFacesNames = (typeof RubikCube3x3RealFacesNames)[number];

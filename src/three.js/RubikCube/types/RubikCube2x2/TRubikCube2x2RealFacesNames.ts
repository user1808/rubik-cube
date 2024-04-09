export const RubikCube2x2RealFacesNames = [
  'TopFace',
  'DownFace',
  'FrontFace',
  'BackFace',
  'RightFace',
  'LeftFace',
] as const;

export type TRubikCube2x2RealFacesNames = (typeof RubikCube2x2RealFacesNames)[number];

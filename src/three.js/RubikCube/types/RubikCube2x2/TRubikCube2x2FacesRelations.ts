export type TRubikCube2x2FacesRelations = {
  TopFace: 'FrontFace' | 'LeftFace' | 'BackFace' | 'RightFace';
  BackFace: 'TopFace' | 'LeftFace' | 'DownFace' | 'RightFace';
  DownFace: 'FrontFace' | 'RightFace' | 'BackFace' | 'LeftFace';
  FrontFace: 'TopFace' | 'RightFace' | 'DownFace' | 'LeftFace';
  LeftFace: 'TopFace' | 'FrontFace' | 'DownFace' | 'BackFace';
  RightFace: 'TopFace' | 'BackFace' | 'DownFace' | 'FrontFace';
};

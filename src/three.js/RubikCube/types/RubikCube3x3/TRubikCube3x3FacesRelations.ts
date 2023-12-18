export type TRubikCube3x3FacesRelations = {
  TopFace: 'FrontFace' | 'LeftFace' | 'BackFace' | 'RightFace';
  BackFace: 'TopFace' | 'LeftFace' | 'DownFace' | 'RightFace';
  DownFace: 'FrontFace' | 'RightFace' | 'BackFace' | 'LeftFace';
  FrontFace: 'TopFace' | 'RightFace' | 'DownFace' | 'LeftFace';
  LeftFace: 'TopFace' | 'FrontFace' | 'DownFace' | 'BackFace';
  RightFace: 'TopFace' | 'BackFace' | 'DownFace' | 'FrontFace';
  SliceXFace: 'TopFace' | 'BackFace' | 'DownFace' | 'FrontFace';
  SliceYFace: 'FrontFace' | 'LeftFace' | 'BackFace' | 'RightFace';
  SliceZFace: 'TopFace' | 'RightFace' | 'DownFace' | 'LeftFace';
};

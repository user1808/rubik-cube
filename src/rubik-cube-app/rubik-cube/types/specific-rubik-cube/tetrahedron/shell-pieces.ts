type TTetrahedronFaces = 'Front' | 'Right' | 'Left' | 'Down';
type TTetrahedronShellFacePieces =
  | 'Top'
  | 'Middle'
  | AddSuffix<'Middle', 'Left' | 'Right'>
  | 'Bottom'
  | AddSuffix<'Bottom', 'Left' | 'LeftCorner' | 'Right' | 'RightCorner'>;

export type TTetrahedronShellPieces = AddSuffix<TTetrahedronFaces, TTetrahedronShellFacePieces>;

import type { THexahedronFaces } from '../cube-faces';

type THexahedron4x4ShellPiecesVerticalPosition = 'Top' | 'MidTop' | 'MidDown' | 'Down';
type THexahedron4x4ShellPiecesHorizontalPosition = 'Left' | 'MidLeft' | 'MidRight' | 'Right';

export type THexahedron4x4ShellPieces = AddSuffix<
  AddSuffix<THexahedronFaces, THexahedron4x4ShellPiecesVerticalPosition>,
  THexahedron4x4ShellPiecesHorizontalPosition
>;

import type { THexahedronFaces } from '../cube-faces';

type THexahedron5x5ShellPiecesVerticalPosition = 'Top' | 'MidTop' | 'Center' | 'MidDown' | 'Down';
type THexahedron5x5ShellPiecesHorizontalPosition =
  | 'Left'
  | 'MidLeft'
  | 'Center'
  | 'MidRight'
  | 'Right';

export type THexahedron5x5ShellPieces = AddSuffix<
  AddSuffix<THexahedronFaces, THexahedron5x5ShellPiecesVerticalPosition>,
  THexahedron5x5ShellPiecesHorizontalPosition
>;

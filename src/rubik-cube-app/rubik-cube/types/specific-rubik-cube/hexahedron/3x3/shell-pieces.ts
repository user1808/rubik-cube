import type { THexahedronFaces } from '../cube-faces';

type THexahedron3x3ShellPiecesVerticalPosition = 'Top' | 'Center' | 'Down';
type THexahedron3x3ShellPiecesHorizontalPosition = 'Left' | 'Center' | 'Right';

export type THexahedron3x3ShellPieces = AddSuffix<
  AddSuffix<THexahedronFaces, THexahedron3x3ShellPiecesVerticalPosition>,
  THexahedron3x3ShellPiecesHorizontalPosition
>;

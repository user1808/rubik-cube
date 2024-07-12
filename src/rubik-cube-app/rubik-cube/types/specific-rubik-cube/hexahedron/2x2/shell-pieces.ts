import type { THexahedronFaces } from '../cube-faces';

type THexahedron2x2ShellPiecesVerticalPosition = 'Top' | 'Down';
type THexahedron2x2ShellPiecesHorizontalPosition = 'Left' | 'Right';

export type THexahedron2x2ShellPieces = AddSuffix<
  AddSuffix<THexahedronFaces, THexahedron2x2ShellPiecesVerticalPosition>,
  THexahedron2x2ShellPiecesHorizontalPosition
>;

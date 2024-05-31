import type { THexahedronFaces } from '../cube-faces';

type THexahedron5x5SliceGroups =
  | AddSuffix<THexahedronFaces, 'Slice'>
  | 'SliceX'
  | 'SliceY'
  | 'SliceZ';

export type THexahedron5x5RotationGroups = THexahedronFaces | THexahedron5x5SliceGroups;

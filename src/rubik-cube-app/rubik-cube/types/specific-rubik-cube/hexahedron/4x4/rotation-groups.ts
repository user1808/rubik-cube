import type { THexahedronFaces } from '../cube-faces';

type THexahedron4x4SliceGroups = AddSuffix<THexahedronFaces, 'Slice'>;

export type THexahedron4x4RotationGroups = THexahedronFaces | THexahedron4x4SliceGroups;

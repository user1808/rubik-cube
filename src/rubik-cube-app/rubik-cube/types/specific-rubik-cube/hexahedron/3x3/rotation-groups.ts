import type { THexahedronFaces } from '../cube-faces';

type THexahedron3x3SliceGroups = 'SliceX' | 'SliceY' | 'SliceZ';

export type THexahedron3x3RotationGroups = THexahedronFaces | THexahedron3x3SliceGroups;

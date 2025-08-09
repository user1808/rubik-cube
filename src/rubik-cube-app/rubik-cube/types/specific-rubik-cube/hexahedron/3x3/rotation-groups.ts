import { HexahedronFaces } from '../cube-faces';

const THexahedron3x3SliceGroups = ['SliceX', 'SliceY', 'SliceZ'] as const;

export const Hexahedron3x3RotationGroups = [
  ...HexahedronFaces,
  ...THexahedron3x3SliceGroups,
] as const;

export type THexahedron3x3RotationGroups = (typeof Hexahedron3x3RotationGroups)[number];

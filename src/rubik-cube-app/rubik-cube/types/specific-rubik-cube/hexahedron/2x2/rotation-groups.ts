import { HexahedronFaces } from '../cube-faces';

export const Hexahedron2x2RotationGroups = [...HexahedronFaces] as const;

export type THexahedron2x2RotationGroups = (typeof Hexahedron2x2RotationGroups)[number];

import { DodecahedronFaces } from './cube-faces';

export const DodecahedronRotationGroups = [...DodecahedronFaces] as const;

export type TDodecahedronRotationGroups = (typeof DodecahedronRotationGroups)[number];

import { HexahedronFaces } from '../cube-faces';

const Hexahedron4x4SliceGroups = [
  'FrontSlice',
  'BackSlice',
  'RightSlice',
  'LeftSlice',
  'UpSlice',
  'DownSlice',
] as const;

export const Hexahedron4x4RotationGroups = [
  ...HexahedronFaces,
  ...Hexahedron4x4SliceGroups,
] as const;

export type THexahedron4x4RotationGroups = (typeof Hexahedron4x4RotationGroups)[number];

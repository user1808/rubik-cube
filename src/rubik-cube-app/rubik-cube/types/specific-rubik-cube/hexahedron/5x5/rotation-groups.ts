import { HexahedronFaces } from '../cube-faces';

const Hexahedron5x5SliceGroups = [
  'FrontSlice',
  'BackSlice',
  'RightSlice',
  'LeftSlice',
  'UpSlice',
  'DownSlice',
  'SliceX',
  'SliceY',
  'SliceZ',
] as const;

export const Hexahedron5x5RotationGroups = [
  ...HexahedronFaces,
  ...Hexahedron5x5SliceGroups,
] as const;

export type THexahedron5x5RotationGroups = (typeof Hexahedron5x5RotationGroups)[number];

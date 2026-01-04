export const CubeCommonNames = [
  '2x2x2 Cube',
  '3x3x3 Cube',
  '4x4x4 Cube',
  '5x5x5 Cube',
  'Megaminx',
  'Pyraminx',
] as const;
export type TCubeCommonNames = (typeof CubeCommonNames)[number];

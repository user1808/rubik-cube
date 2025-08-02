export const CubeCommonNames = [
  '2x2 Cube',
  '3x3 Cube',
  '4x4 Cube',
  '5x5 Cube',
  'Megaminx',
  'Pyraminx',
] as const;
export type TCubeCommonNames = (typeof CubeCommonNames)[number];

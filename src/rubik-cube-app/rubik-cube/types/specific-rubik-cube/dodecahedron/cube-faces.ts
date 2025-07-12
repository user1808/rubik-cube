export const DodecahedronFaces = [
  'Up',
  'Down',
  'Right',
  'BackLeft',
  'Front',
  'Back',
  'Left',
  'BackRight',
  'UpLeft',
  'DownRight',
  'UpRight',
  'DownLeft',
] as const;
const DodecahedronEdgeFaces = ['EdgeFace'] as const;

export type TDodecahedronFaces = (typeof DodecahedronFaces)[number];
export type TDodecahedronEdgeFaces = (typeof DodecahedronEdgeFaces)[number];

export const DodecahedronRotationTypes = [
  'Clockwise',
  'CounterClockwise',
  'DoubleClockwise',
  'DoubleCounterClockwise',
] as const;

export type TDodecahedronRotationTypes = (typeof DodecahedronRotationTypes)[number];

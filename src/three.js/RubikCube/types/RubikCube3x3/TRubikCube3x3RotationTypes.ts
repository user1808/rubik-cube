export const RubikCube3x3RotationTypes = ['Clockwise', 'CounterClockwise', 'DoubleTurn'] as const;

export type TRubikCube3x3RotationTypes = (typeof RubikCube3x3RotationTypes)[number];

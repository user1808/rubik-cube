export const RubikCube2x2RotationTypes = ['Clockwise', 'CounterClockwise', 'DoubleTurn'] as const;

export type TRubikCube2x2RotationTypes = (typeof RubikCube2x2RotationTypes)[number];

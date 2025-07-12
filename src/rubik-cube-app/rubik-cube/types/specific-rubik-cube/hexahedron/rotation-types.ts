export const HexahedronRotationTypes = ['Clockwise', 'CounterClockwise', 'Double'] as const;

export type THexahedronRotationTypes = (typeof HexahedronRotationTypes)[number];

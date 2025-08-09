export const HexahedronRotationTypes = ['Clockwise', 'CounterClockwise'] as const;

export type THexahedronRotationTypes = (typeof HexahedronRotationTypes)[number];

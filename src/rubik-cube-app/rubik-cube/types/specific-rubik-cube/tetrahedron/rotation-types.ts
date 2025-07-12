export const TetrahedronRotationTypes = ['Clockwise', 'CounterClockwise'] as const;

export type TTetrahedronRotationTypes = (typeof TetrahedronRotationTypes)[number];

export const TetrahedronFaces = ['Front', 'Right', 'Left', 'Down'] as const;
const TetrahedronEdgeFaces = ['EdgeFace'] as const;

export type TTetrahedronFaces = (typeof TetrahedronFaces)[number];
export type TTetrahedronEdgeFaces = (typeof TetrahedronEdgeFaces)[number];

const HexahedronFaces = ['Front', 'Back', 'Right', 'Left', 'Up', 'Down'] as const;
const HexahedronEdgeFaces = ['EdgeFace'] as const;

export type THexahedronFaces = (typeof HexahedronFaces)[number];
export type THexahedronEdgeFaces = (typeof HexahedronEdgeFaces)[number];

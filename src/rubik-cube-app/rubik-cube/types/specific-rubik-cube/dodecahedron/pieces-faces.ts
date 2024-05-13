const DodecahedronPiecesFaces = {
  'RubikDodecahedronEdgePiece.glb': ['FaceA', 'FaceB', 'FaceC', 'FaceD', 'FaceE', 'FaceF'] as const,
  'RubikDodecahedronFacePiece.glb': [
    'FaceA',
    'FaceB',
    'FaceC',
    'FaceD',
    'FaceE',
    'FaceF',
    'FaceG',
  ] as const,
  'RubikDodecahedronVertexPiece.glb': [
    'FaceA',
    'FaceB',
    'FaceC',
    'FaceD',
    'FaceE',
    'FaceF',
  ] as const,
};

export type TDodecahedronPiecesFilenames = keyof typeof DodecahedronPiecesFaces;
export type TDodecahedronPiecesWithFaces = {
  [DodecahedronPieceFilename in TDodecahedronPiecesFilenames]: (typeof DodecahedronPiecesFaces)[DodecahedronPieceFilename][number];
};

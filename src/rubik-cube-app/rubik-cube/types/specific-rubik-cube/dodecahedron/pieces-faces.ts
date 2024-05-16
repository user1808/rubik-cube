const DodecahedronPiecesFilenamesWithFaces = {
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

export type TDodecahedronPiecesFilenames = keyof typeof DodecahedronPiecesFilenamesWithFaces;
export type TDodecahedronPiecesFilenamesWithFaces = {
  [DodecahedronPieceFilename in TDodecahedronPiecesFilenames]: (typeof DodecahedronPiecesFilenamesWithFaces)[DodecahedronPieceFilename][number];
};

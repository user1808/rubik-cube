const TetrahedronPiecesFilenamesWithFaces = {
  'RubikTetrahedronPiece.glb': ['FaceA', 'FaceB', 'FaceC', 'FaceD'] as const,
  'RubikOctahedronPiece.glb': [
    'FaceA',
    'FaceB',
    'FaceC',
    'FaceD',
    'FaceE',
    'FaceF',
    'FaceG',
    'FaceH',
  ] as const,
};

export type TTetrahedronPiecesFilenames = keyof typeof TetrahedronPiecesFilenamesWithFaces;
export type TTetrahedronPiecesFilenamesWithFaces = {
  [TetrahedronPieceFilename in TTetrahedronPiecesFilenames]: (typeof TetrahedronPiecesFilenamesWithFaces)[TetrahedronPieceFilename][number];
};

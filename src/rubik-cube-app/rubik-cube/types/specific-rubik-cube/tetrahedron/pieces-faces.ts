const TetrahedronPiecesFaces = {
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

export type TTetrahedronPiecesFilenames = keyof typeof TetrahedronPiecesFaces;
export type TTetrahedronPiecesWithFaces = {
  [TetrahedronPieceFilename in TTetrahedronPiecesFilenames]: (typeof TetrahedronPiecesFaces)[TetrahedronPieceFilename][number];
};

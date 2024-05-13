const HexahedronPiecesFaces = {
  'RubikCubePiece.glb': ['FaceA', 'FaceB', 'FaceC', 'FaceD', 'FaceE', 'FaceF'] as const,
};

export type THexahedronPiecesFilenames = keyof typeof HexahedronPiecesFaces;
export type THexahedronPiecesWithFaces = {
  [HexahedronPieceFilename in THexahedronPiecesFilenames]: (typeof HexahedronPiecesFaces)[HexahedronPieceFilename][number];
};

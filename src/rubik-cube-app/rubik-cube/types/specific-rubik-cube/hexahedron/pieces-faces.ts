const HexahedronPiecesFilenamesWithFaces = {
  'RubikCubePiece.glb': ['FaceA', 'FaceB', 'FaceC', 'FaceD', 'FaceE', 'FaceF'] as const,
};

export type THexahedronPiecesFilenames = keyof typeof HexahedronPiecesFilenamesWithFaces;
export type THexahedronPiecesFilenamesWithFaces = {
  [HexahedronPieceFilename in THexahedronPiecesFilenames]: (typeof HexahedronPiecesFilenamesWithFaces)[HexahedronPieceFilename][number];
};

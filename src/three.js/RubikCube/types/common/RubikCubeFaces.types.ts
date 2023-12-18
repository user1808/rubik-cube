import type { RubikCubePiece } from '../../classes/RubikCube/RubikCubePiece';

export type TRubikCubePseudoFaces<PseudoFacesNames extends string | never> = {
  [PseudoFaceName in PseudoFacesNames]: TRubikCubePseudoFace<PseudoFaceName>;
};

export type TRubikCubePseudoFace<FaceName extends string> = TRubikCubeFace<FaceName> & {
  pieces: Array<TRubikCubePseudoFacePiece>;
};

export type TRubikCubePseudoFacePiece = TRubikCubeFacePiece<false> & {
  piece: RubikCubePiece;
};

export type TRubikCubeRealFaces<RealFacesNames extends string> = {
  [RealFaceName in RealFacesNames]: TRubikCubeRealFace<RealFaceName>;
};

export type TRubikCubeRealFace<FaceName extends string> = TRubikCubeFace<FaceName> & {
  pieces: Array<TRubikCubeRealFacePiece>;
  normalVector: THREE.Vector3;
};

export type TRubikCubeRealFacePiece = TRubikCubeFacePiece<true> & {
  piece: RubikCubePiece;
  value: TRubikCubeFacePieceValue;
};

export type TRubikCubeFacePieceValue = number;

export type TRubikCubeFace<FaceName extends string> = {
  faceName: FaceName;
};

export type TRubikCubeFacePiece<IsRealFace extends boolean> = {
  isRealFace: IsRealFace;
};

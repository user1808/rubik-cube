import type { IRubikCubePiece } from './IRubikCubePiece';

export interface IRubikCube<FaceNames extends string, PieceCoverFaceName extends string> {
  get faces(): Map<FaceNames, Array<IRubikCubePiece<FaceNames, PieceCoverFaceName>>>;
  get pieces(): Array<IRubikCubePiece<FaceNames, PieceCoverFaceName>>;
}

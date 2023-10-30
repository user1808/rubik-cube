import type { TRubikCubeFacePiece } from '../types/common/TRubikCubeFacePiece';
import type { IRubikCubePiece } from './IRubikCubePiece';

export interface IRubikCube<FaceNames extends string> {
  get faces(): Map<FaceNames, Array<TRubikCubeFacePiece>>;
  get pieces(): Array<IRubikCubePiece>;
}

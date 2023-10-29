import type { IRubikCubePiece } from './IRubikCubePiece';

export interface IRubikCube<FaceNames extends string> {
  get faces(): Map<FaceNames, Array<IRubikCubePiece>>;
  get pieces(): Array<IRubikCubePiece>;
}

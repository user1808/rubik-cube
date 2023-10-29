import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';

export class RubikCube3x3 implements IRubikCube<TRubikCube3x3FaceNames> {
  constructor(
    private readonly _faces: Map<TRubikCube3x3FaceNames, Array<IRubikCubePiece>>,
    private readonly _pieces: Array<IRubikCubePiece>,
  ) {}

  public get faces(): Map<TRubikCube3x3FaceNames, Array<IRubikCubePiece>> {
    return this._faces;
  }

  public get pieces(): Array<IRubikCubePiece> {
    return this._pieces;
  }
}

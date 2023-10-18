import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';

export class RubikCube3x3
  implements IRubikCube<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
{
  constructor(
    private readonly _faces: Map<
      TRubikCube3x3FaceNames,
      Array<IRubikCubePiece<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>>
    >,
    private readonly _pieces: Array<
      IRubikCubePiece<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
    >,
  ) {}

  get faces() {
    return this._faces;
  }
  get pieces() {
    return this._pieces;
  }
}

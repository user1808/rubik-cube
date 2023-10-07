import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { TRubikCubeCoverFaceName } from '../../types/RubikCubeCoverFaceName';
import type { TRubikCubeCommonFaceNames } from '../../types/RubikCubeCommonFaceNames';

export class RubikCube3x3
  implements IRubikCube<TRubikCubeCommonFaceNames, TRubikCubeCoverFaceName>
{
  constructor(
    private readonly _faces: Map<
      TRubikCubeCommonFaceNames,
      Array<IRubikCubePiece<TRubikCubeCommonFaceNames, TRubikCubeCoverFaceName>>
    >,
    private readonly _pieces: Array<
      IRubikCubePiece<TRubikCubeCommonFaceNames, TRubikCubeCoverFaceName>
    >,
  ) {}

  get faces() {
    return this._faces;
  }
  get pieces() {
    return this._pieces;
  }
}

import { RubikCubePieceFace } from './rubik-cube-piece-face';

type TRubikCubePieceVisibleFaceConstructorParams = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  color: number;
};

/**
 * Class for the RubikCubePieceVisibleFace class. Extends the RubikCubePieceFace class.
 * Represents a visible face of a Rubik's Cube piece.
 */
export class RubikCubePieceVisibleFace extends RubikCubePieceFace {
  private readonly _color: number;

  constructor(params: TRubikCubePieceVisibleFaceConstructorParams) {
    super(params);
    this._color = params.color;
  }

  public get color() {
    return this._color;
  }
}

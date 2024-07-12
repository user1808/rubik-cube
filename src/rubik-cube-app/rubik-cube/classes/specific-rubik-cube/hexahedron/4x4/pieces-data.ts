import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron4x4PiecesData extends AbstractRubikHexahedronPiecesData {
  protected override readonly size: THexahedronSize = 4;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-1.5, -0.5, 0.5, 1.5],
    y: [1.5, 0.5, -0.5, -1.5],
    z: [-1.5, -0.5, 0.5, 1.5],
  };
}

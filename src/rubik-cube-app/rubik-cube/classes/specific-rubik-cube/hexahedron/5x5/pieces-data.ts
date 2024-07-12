import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron5x5PiecesData extends AbstractRubikHexahedronPiecesData {
  protected override readonly size: THexahedronSize = 5;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-2, -1, 0, 1, 2],
    y: [2, 1, 0, -1, -2],
    z: [-2, -1, 0, 1, 2],
  };
}

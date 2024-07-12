import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron3x3PiecesData extends AbstractRubikHexahedronPiecesData {
  protected override readonly size: THexahedronSize = 3;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-1, 0, 1],
    y: [1, 0, -1],
    z: [-1, 0, 1],
  };
}

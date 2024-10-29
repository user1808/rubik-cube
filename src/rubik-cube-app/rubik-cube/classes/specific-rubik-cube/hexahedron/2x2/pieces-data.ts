import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron2x2PiecesData extends AbstractRubikHexahedronPiecesData {
  protected override readonly size: THexahedronSize = 2;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-0.5, 0.5],
    y: [0.5, -0.5],
    z: [-0.5, 0.5],
  };
}

import * as THREE from 'three';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';

export class RubikCube3x3Piece
  implements IRubikCubePiece<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
{
  private readonly _entirePiece: THREE.Group = new THREE.Group();

  constructor(
    private readonly _id: number,
    private readonly _faces: Map<
      TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName,
      THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
    >,
  ) {
    for (const [, pieces] of _faces) {
      this._entirePiece.add(pieces);
    }
    this._entirePiece.userData.id = _id;
  }

  get faces(): Map<
    TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName,
    THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.MeshBasicMaterial>
  > {
    return this._faces;
  }

  get entirePiece(): THREE.Group {
    return this._entirePiece;
  }

  get id(): number {
    return this._id;
  }
}

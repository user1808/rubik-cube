import * as THREE from 'three';
import type { IRubikCubePiece } from '../interfaces/IRubikCubePiece';

export class RubikCubePiece<FaceNames extends string, CoverFaceName extends string>
  implements IRubikCubePiece<FaceNames, CoverFaceName>
{
  private readonly _entirePiece: THREE.Group = new THREE.Group();
  constructor(
    private readonly _id: number,
    private readonly _faces: Map<
      FaceNames | CoverFaceName,
      THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
    >,
    position: THREE.Vector3,
  ) {
    for (const [, pieces] of _faces) {
      this._entirePiece.add(pieces);
    }
    this._entirePiece.position.set(position.x, position.y, position.z);
  }

  get id(): number {
    return this._id;
  }
  get faces(): Map<
    FaceNames | CoverFaceName,
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  > {
    return this._faces;
  }
  get entirePiece(): THREE.Group {
    return this._entirePiece;
  }
}

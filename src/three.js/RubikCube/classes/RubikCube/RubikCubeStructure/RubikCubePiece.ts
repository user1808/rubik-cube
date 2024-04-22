import * as THREE from 'three';
import type { RubikCubePieceVisibleFace } from './RubikCubePieceVisibleFace';
import type { RubikCubePieceFace } from './RubikCubePieceFace';

export type TRubikCubePieceId = number;
export type TRubikCubePieceBasicData = Pick<RubikCubePiece, 'pieceId' | 'position'>;

export class RubikCubePiece extends THREE.Group {
  private readonly _faces: Array<RubikCubePieceFace>;

  constructor(
    private readonly _pieceId: TRubikCubePieceId,
    private readonly _visibleFaces: Array<RubikCubePieceVisibleFace>,
    _hiddenFaces: Array<RubikCubePieceFace>,
    _edgeFace: RubikCubePieceFace,
  ) {
    super();
    this._faces = [..._visibleFaces, ..._hiddenFaces, _edgeFace];
    this.add(...this._faces);
  }

  public get pieceId(): TRubikCubePieceId {
    return this._pieceId;
  }

  public get visibleFaces(): Array<RubikCubePieceVisibleFace> {
    return this._visibleFaces;
  }

  public setPosition(position: THREE.Vector3): void {
    this.position.set(
      Number(position.x.toFixed(2)),
      Number(position.y.toFixed(2)),
      Number(position.z.toFixed(2)),
    );
  }
}

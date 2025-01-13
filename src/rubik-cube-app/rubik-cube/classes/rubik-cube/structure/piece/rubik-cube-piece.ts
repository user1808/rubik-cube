import { Group } from 'three';
import type { RubikCubePieceFace } from './rubik-cube-piece-face';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TCubeFaceColor, TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { RubikCubePieceVisibleFace } from './rubik-cube-piece-visible-face';

export class RubikCubePiece<TCubeFacesNames extends string>
  extends Group
  implements IRubikCubePiece<TCubeFacesNames>
{
  constructor(
    public readonly pieceId: TPieceId,
    public readonly pieceAllFaces: Array<RubikCubePieceFace>,
    public readonly pieceVisibleFaces: Array<RubikCubePieceVisibleFace<TCubeFacesNames>>,
    public readonly pieceCubeFacesColors: Record<TCubeFacesNames, Nullable<TCubeFaceColor>>,
  ) {
    super();
    this.add(...pieceAllFaces);
  }

  public dispose() {
    this.pieceAllFaces.forEach((face) => face.dispose());
  }
}

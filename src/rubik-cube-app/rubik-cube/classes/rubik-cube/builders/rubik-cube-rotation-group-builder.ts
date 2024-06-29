import type { IRubikCubeRotationGroupBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-group-builder';
import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubeRotationGroupBuidler implements IRubikCubeRotationGroupBuilder {
  public buildRotationGroup(
    cubePieces: Array<IRubikCubePieceWrapper>,
    rotationGroupPiecesIdxs: Array<number>,
  ): Array<IRubikCubePieceWrapper> {
    return rotationGroupPiecesIdxs.map((idx) => cubePieces[idx]);
  }
}

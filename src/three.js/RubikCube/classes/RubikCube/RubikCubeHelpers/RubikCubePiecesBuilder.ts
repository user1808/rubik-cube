import type { IRubikCubeData } from '@/three.js/RubikCube/interfaces/IRubikCubeData';
import type { IRubikCubePieceMaterials } from '@/three.js/RubikCube/interfaces/IRubikCubePiecesMaterials';
import type { RubikCubePiece } from '../CubeStructure/Piece/RubikCubePiece';

export class RubikCubePiecesBuilder<
  Piece extends string,
  EdgeFacesNames extends string,
> {
  public buildPieces(
    loadedPiece: THREE.Group,
    materials: IRubikCubePieceMaterials<RealFacesNames, EdgeFacesNames>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): Array<RubikCubePiece> {
    throw new Error('not yet implemented');
  }

  private buildPiece(): RubikCubePiece {
    throw new Error();
  }
}

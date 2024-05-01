import type { IRubikCubeData } from '@/three.js/rubik-cube/interfaces/rubik-cube-data';
import { RubikCube } from '../../structure/cube/rubik-cube';
import type { RubikCubePieceBuilder } from '../piece/rubik-cube-piece-builder';
import type { RubikCubePiece } from '../../structure/piece/rubik-cube-piece';

export class RubikCubeBuilder {
  public createCube(
    gltfPiece: THREE.Group,
    cubeData: IRubikCubeData,
    pieceBuilder: RubikCubePieceBuilder,
  ): RubikCube {
    return new RubikCube(this._createCubePieces(gltfPiece, cubeData, pieceBuilder));
  }

  private _createCubePieces(
    gltfPiece: THREE.Group,
    cubeData: IRubikCubeData,
    pieceBuilder: RubikCubePieceBuilder,
  ): Array<RubikCubePiece> {
    const cubePieces = cubeData.piecesData.map((pieceData) => {
      const piece = pieceBuilder.createPiece(gltfPiece);
      const { x: posX, y: posY, z: posZ } = pieceData.position;
      piece.position.set(posX, posY, posZ);
      return piece;
    });
    return cubePieces;
  }
}

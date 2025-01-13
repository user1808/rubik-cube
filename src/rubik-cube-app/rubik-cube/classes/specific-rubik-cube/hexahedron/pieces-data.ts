import { Vector3, Euler } from 'three';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  THexahedronPiecesFilenames,
  THexahedronPiecesFilenamesWithFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';

export type THexahedronSize = number;
export type THexahedronPositionValues = Record<'x' | 'y' | 'z', Array<number>>;

export abstract class AbstractRubikHexahedronPiecesData
  implements IRubikCubePiecesData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>
{
  public readonly piecesFilenames: Array<THexahedronPiecesFilenames> = ['RubikCubePiece.glb'];

  public readonly facesNormalVectors: Record<THexahedronFaces, Vector3> = {
    Front: new Vector3(0, 0, 1),
    Back: new Vector3(0, 0, -1),
    Right: new Vector3(1, 0, 0),
    Left: new Vector3(-1, 0, 0),
    Up: new Vector3(0, 1, 0),
    Down: new Vector3(0, -1, 0),
  };

  /**
   * The size of the cube. For example, 2 means cube 2x2x2, 3 means 3x3x3, 4 means 4x4x4, etc.
   */
  protected abstract readonly size: THexahedronSize;
  /**
   * The position values for the cube pieces. Arrays should be length of `size`.
   * For example, if size is 3, then the arrays should be length of 3.
   * Values in arrays means the position of next layer of the cube.
   * For example, if size is 3, then the position values for x axis should be [-1, 0, 1]
   * because the cube pieces should be positioned at -1, 0, 1 on x axis.
   */
  protected abstract readonly positionValues: THexahedronPositionValues;

  public get piecesInitData(): Array<
    TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>
  > {
    return this.createCubePiecesData();
  }

  /**
   * Creates the cube (regular hexahedron) pieces data.
   * The cube pieces data should be created according to the size of the cube.
   * This method handles positioning and mapping piece faces to cube faces,
   * but only for hexahedron type of cubes.
   * @returns The cube pieces data.
   */
  private createCubePiecesData(): Array<
    TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>
  > {
    const piecesData: Array<TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>> = [];

    const maxLoopValue = this.size - 1;
    let id: number = 0;
    /**
     * Loop through the cube pieces and create the cube pieces data.
     * i is for y axis, j is for z axis, k is for x axis.
     */
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          /**
           * Skip the pieces that are not on the surface of the cube.
           */
          if (i > 0 && i < maxLoopValue && j > 0 && j < maxLoopValue && k > 0 && k < maxLoopValue) {
            continue;
          }
          piecesData.push({
            id: id++,
            position: new Vector3(
              this.positionValues['x'][k],
              this.positionValues['y'][i],
              this.positionValues['z'][j],
            ),
            rotation: new Euler(),
            filename: 'RubikCubePiece.glb',
            pieceFacesToCubeFaces: {
              FaceA: i == 0 ? 'Up' : undefined,
              FaceB: j == this.size - 1 ? 'Front' : undefined,
              FaceC: k == this.size - 1 ? 'Right' : undefined,
              FaceD: j == 0 ? 'Back' : undefined,
              FaceE: k == 0 ? 'Left' : undefined,
              FaceF: i == this.size - 1 ? 'Down' : undefined,
            },
          });
        }
      }
    }

    return piecesData;
  }
}

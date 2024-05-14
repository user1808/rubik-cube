import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type {
  THexahedronPiecesFilenames,
  THexahedronPiecesFilenamesWithFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/pieces-faces';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export abstract class RubikHexahedronPiecesData
  implements IRubikCubePiecesData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>
{
  public get piecesFilenames(): Array<THexahedronPiecesFilenames> {
    return ['RubikCubePiece.glb'];
  }

  public get piecesData(): Array<TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>> {
    return this.createCubePiecesData();
  }

  protected abstract get size(): number;
  protected abstract get positionValues(): Record<'x' | 'y' | 'z', Array<number>>;

  private createCubePiecesData(): Array<TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>> {
    const piecesData: Array<TPieceData<THexahedronPiecesFilenamesWithFaces, THexahedronFaces>> = [];

    const maxLoopValue = this.size - 1;
    let id: number = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          if (i > 0 && i < maxLoopValue && j > 0 && j < maxLoopValue && k > 0 && k < maxLoopValue) {
            continue;
          }
          piecesData.push({
            id: id++,
            position: new THREE.Vector3(
              this.positionValues['x'][k],
              this.positionValues['y'][i],
              this.positionValues['z'][j],
            ),
            rotation: new THREE.Euler(),
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

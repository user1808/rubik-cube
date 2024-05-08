import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { THexahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/filenames';

export abstract class RubikHexahedronPiecesData
  implements IRubikCubePiecesData<THexahedronFilenames>
{
  public get piecesFilenames(): Array<THexahedronFilenames> {
    return ['RubikCubePiece.glb'];
  }

  public get piecesData(): Array<TPieceData<THexahedronFilenames>> {
    return this.createCubePiecesData();
  }

  protected abstract get size(): number;
  protected abstract get positionValues(): Record<'x' | 'y' | 'z', Array<number>>;

  private createCubePiecesData(): Array<TPieceData<THexahedronFilenames>> {
    const piecesData: Array<TPieceData<THexahedronFilenames>> = [];

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
          });
        }
      }
    }

    return piecesData;
  }
}

import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import type { TDodecahedronFilenames } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/filenames';
import { Radians } from '@/utils/radians';

type TCreateGroupOfPiecesDataParams = {
  startIdx: number;
  count: number;
  rotationData: Record<'x' | 'y' | 'z', Array<number>>;
  positionData: Record<'x' | 'y' | 'z', Array<number>>;
  filename: TDodecahedronFilenames;
};

export class RubikDodecahedronPiecesData implements IRubikCubePiecesData<TDodecahedronFilenames> {
  public get piecesFilenames(): Array<TDodecahedronFilenames> {
    return [
      'RubikDodecahedronEdgePiece.glb',
      'RubikDodecahedronFacePiece.glb',
      'RubikDodecahedronVertexPiece.glb',
    ];
  }
  public get piecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    return [
      ...this.createTopLayerEdgePiecesData(),
      ...this.createTopLayerVertexPiecesData(),
      ...this.createTopLayerFacePieceData(),
      ...this.createTopEdgePiecesData(),
      ...this.createTopFacePiecesData(),
      ...this.createTopVertexPiecesData(),
      ...this.createMiddleEdgePiecesData(),
      ...this.createBottomVertexPiecesData(),
      ...this.createBottomFacePiecesData(),
      ...this.createBottomEdgePiecesData(),
      ...this.createBottomLayerEdgePiecesData(),
      ...this.createBottomLayerVertexPiecesData(),
      ...this.createBottomLayerFacePieceData(),
    ];
  }

  private createTopLayerEdgePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['72deg'];
    return this.createGroupOfPiecesData({
      startIdx: 0,
      count: 5,
      positionData: {
        x: [0, 1.062, 0.656, -0.656, -1.062],
        y: Array(5).fill(1.806),
        z: [1.116, 0.345, -0.903, -0.903, 0.345],
      },
      rotationData: {
        x: Array(5).fill(0),
        y: [0, rotY, 2 * rotY, 3 * rotY, 4 * rotY],
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronEdgePiece.glb',
    });
  }
  private createTopLayerVertexPiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    return this.createGroupOfPiecesData({
      startIdx: 5,
      count: 5,
      positionData: {
        x: [0.811, 1.312, 0, -1.312, -0.811],
        y: Array(5).fill(1.806),
        z: [1.116, -0.426, -1.38, -0.426, 1.116],
      },
      rotationData: {
        x: Array(5).fill(0),
        y: [2 * rotY, 6 * rotY, 10 * rotY, 14 * rotY, 18 * rotY],
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronVertexPiece.glb',
    });
  }
  private createTopLayerFacePieceData(): Array<TPieceData<TDodecahedronFilenames>> {
    return [
      {
        id: 10,
        position: new THREE.Vector3(0, 1.806, 0),
        rotation: new THREE.Euler(0, 2 * Radians['18deg'], 0),
        filename: 'RubikDodecahedronFacePiece.glb',
      },
    ];
  }
  private createTopEdgePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    return this.createGroupOfPiecesData({
      startIdx: 11,
      count: 5,
      positionData: {
        x: [1.062, 1.718, 0, -1.718, -1.062],
        y: Array(5).fill(1.116),
        z: [1.461, -0.558, -1.8065, -0.558, 1.461],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(148.3)),
        y: [7 * rotY, 11 * rotY, 15 * rotY, 19 * rotY, 3 * rotY],
        z: Array(5).fill(Radians.angleToRadians(121.7)),
      },
      filename: 'RubikDodecahedronEdgePiece.glb',
    });
  }
  private createTopFacePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['72deg'];
    return this.createGroupOfPiecesData({
      startIdx: 16,
      count: 5,
      positionData: {
        x: [0, 1.537, 0.949, -0.949, -1.537],
        y: Array(5).fill(0.808),
        z: [1.616, 0.499, -1.307, -1.307, 0.499],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(63.4)),
        y: [0, rotY, 2 * rotY, 3 * rotY, 4 * rotY],
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronFacePiece.glb',
    });
  }
  private createTopVertexPiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['72deg'];
    return this.createGroupOfPiecesData({
      startIdx: 21,
      count: 5,
      positionData: {
        x: [1.3125, 2.123, 0, -2.123, -1.3125],
        y: Array(5).fill(0.426),
        z: [1.806, -0.69, -2.233, -0.69, 1.806],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(243.4)),
        y: [3 * rotY, 4 * rotY, 0, rotY, 2 * rotY],
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronVertexPiece.glb',
    });
  }
  private createMiddleEdgePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    const evenRotZ = Radians.angleToRadians(328.3);
    const oddRotZ = Radians.angleToRadians(31.7);
    return this.createGroupOfPiecesData({
      startIdx: 26,
      count: 10,
      positionData: {
        x: [0.656, 1.718, 2.123, 1.718, 0.656, -0.656, -1.718, -2.123, -1.718, -0.656],
        y: Array(10).fill(0),
        z: [2.02, 1.248, 0, -1.248, -2.02, -2.02, -1.248, 0, 1.248, 2.02],
      },
      rotationData: {
        x: Array(10).fill(Radians.angleToRadians(58.3)),
        y: Array(10)
          .fill(rotY)
          .map((angle, idx) => (2 * idx + 1) * angle),
        z: Array(10)
          .fill(0)
          .map((_, idx) => (idx % 2 == 0 ? evenRotZ : oddRotZ)),
      },
      filename: 'RubikDodecahedronEdgePiece.glb',
    });
  }
  private createBottomVertexPiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['72deg'];
    return this.createGroupOfPiecesData({
      startIdx: 36,
      count: 5,
      positionData: {
        x: [0, 2.123, 1.312, -1.312, -2.123],
        y: Array(5).fill(-0.427),
        z: [2.233, 0.69, -1.807, -1.807, 0.69],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(63.4)),
        y: Array(5)
          .fill(rotY)
          .map((angle, idx) => idx * angle),
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronVertexPiece.glb',
    });
  }
  private createBottomFacePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['72deg'];
    return this.createGroupOfPiecesData({
      startIdx: 41,
      count: 5,
      positionData: {
        x: [0.949, 1.536, 0, -1.536, -0.949],
        y: Array(5).fill(-0.808),
        z: [1.307, -0.499, -1.616, -0.499, 1.307],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(243.4)),
        y: Array(5)
          .fill(rotY)
          .map((angle, idx) => (idx + 3) * angle),
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronFacePiece.glb',
    });
  }
  private createBottomEdgePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    return this.createGroupOfPiecesData({
      startIdx: 46,
      count: 5,
      positionData: {
        x: [0, 1.718, 1.062, -1.062, -1.718],
        y: Array(5).fill(-1.116),
        z: [1.806, 0.558, -1.461, -1.461, 0.558],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(148.3)),
        y: Array(5)
          .fill(rotY)
          .map((angle, idx) => (idx * 4 + 5) * angle),
        z: Array(5).fill(Radians.angleToRadians(58.3)),
      },
      filename: 'RubikDodecahedronEdgePiece.glb',
    });
  }
  private createBottomLayerEdgePiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    return this.createGroupOfPiecesData({
      startIdx: 51,
      count: 5,
      positionData: {
        x: [0.656, 1.062, 0, -1.062, -0.656],
        y: Array(5).fill(-1.806),
        z: [0.903, -0.345, -1.116, -0.345, 0.903],
      },
      rotationData: {
        x: Array(5).fill(Radians.angleToRadians(116.6)),
        y: Array(5)
          .fill(rotY)
          .map((angle, idx) => (idx * 4 + 2) * angle),
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronEdgePiece.glb',
    });
  }
  private createBottomLayerVertexPiecesData(): Array<TPieceData<TDodecahedronFilenames>> {
    const rotY = Radians['18deg'];
    return this.createGroupOfPiecesData({
      startIdx: 56,
      count: 5,
      positionData: {
        x: [0, 1.312, 0.811, -0.811, -1.312],
        y: Array(5).fill(-1.806),
        z: [1.38, 0.426, -1.116, -1.116, 0.426],
      },
      rotationData: {
        x: Array(5).fill(0),
        y: Array(5)
          .fill(rotY)
          .map((angle, idx) => (idx * 4 + 10) * angle),
        z: Array(5).fill(0),
      },
      filename: 'RubikDodecahedronVertexPiece.glb',
    });
  }
  private createBottomLayerFacePieceData(): Array<TPieceData<TDodecahedronFilenames>> {
    return [
      {
        id: 61,
        position: new THREE.Vector3(0, -1.806, 0),
        rotation: new THREE.Euler(0, 0, Radians['180deg']),
        filename: 'RubikDodecahedronFacePiece.glb',
      },
    ];
  }

  private createGroupOfPiecesData(
    params: TCreateGroupOfPiecesDataParams,
  ): Array<TPieceData<TDodecahedronFilenames>> {
    const { startIdx, count, rotationData, positionData, filename } = params;
    const piecesData: Array<TPieceData<TDodecahedronFilenames>> = [];

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(positionData.x[i], positionData.y[i], positionData.z[i]);
      const rotation = new THREE.Euler(rotationData.x[i], rotationData.y[i], rotationData.z[i]);
      piecesData.push({
        id: startIdx + i,
        position,
        rotation,
        filename: filename,
      });
    }

    return piecesData;
  }
}

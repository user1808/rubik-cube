import * as THREE from 'three';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { TPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube/piece-data';
import { Radians } from '@/utils/radians';
import type {
  TDodecahedronPiecesFilenames,
  TDodecahedronPiecesFilenamesWithFaces,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/pieces-faces';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';

type TCreateGroupOfPiecesDataParams = {
  [TDodecahedronPieceFilename in TDodecahedronPiecesFilenames]: {
    startIdx: number;
    count: number;
    rotationData: Record<'x' | 'y' | 'z', Array<number>>;
    positionData: Record<'x' | 'y' | 'z', Array<number>>;
    filename: TDodecahedronPieceFilename;
    pieceFacesToCubeFaces: Array<
      Partial<
        Record<
          TDodecahedronPiecesFilenamesWithFaces[TDodecahedronPieceFilename],
          TDodecahedronFaces
        >
      >
    >;
  };
}[TDodecahedronPiecesFilenames];

export class RubikDodecahedronPiecesData
  implements
    IRubikCubePiecesData<
      TDodecahedronPiecesFilenamesWithFaces,
      TDodecahedronFaces,
      TDodecahedronRotationGroups
    >
{
  public get piecesFilenames(): Array<TDodecahedronPiecesFilenames> {
    return [
      'RubikDodecahedronEdgePiece.glb',
      'RubikDodecahedronFacePiece.glb',
      'RubikDodecahedronVertexPiece.glb',
    ];
  }
  public get piecesData(): Array<
    TPieceData<TDodecahedronPiecesFilenamesWithFaces, TDodecahedronFaces>
  > {
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

  public get piecesIdxsForRotationGroups(): Record<TDodecahedronRotationGroups, Array<number>> {
    return {
      Up: [0, 5, 1, 6, 2, 7, 3, 8, 4, 9, 10],
      Down: [53, 58, 52, 57, 51, 56, 55, 60, 54, 59, 61],
      Right: [1, 5, 11, 21, 27, 37, 28, 22, 12, 6, 17],
      BackLeft: [54, 60, 50, 40, 33, 24, 32, 39, 49, 59, 44],
      Front: [0, 9, 15, 25, 35, 36, 26, 21, 11, 5, 16],
      Back: [53, 59, 49, 39, 31, 23, 30, 38, 48, 58, 43],
      Left: [4, 8, 14, 24, 33, 40, 34, 25, 15, 9, 20],
      BackRight: [52, 58, 48, 38, 29, 22, 28, 37, 47, 57, 42],
      UpLeft: [3, 7, 13, 23, 31, 39, 32, 24, 14, 8, 19],
      DownRight: [51, 57, 47, 37, 27, 21, 26, 36, 46, 56, 41],
      UpRight: [2, 6, 12, 22, 29, 38, 30, 23, 13, 7, 18],
      DownLeft: [55, 56, 46, 36, 35, 25, 34, 40, 50, 60, 45],
    };
  }

  private createTopLayerEdgePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Up', FaceB: 'Front' },
        { FaceA: 'Up', FaceB: 'Right' },
        { FaceA: 'Up', FaceB: 'UpRight' },
        { FaceA: 'Up', FaceB: 'UpLeft' },
        { FaceA: 'Up', FaceB: 'Left' },
      ],
    });
  }
  private createTopLayerVertexPiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Up', FaceB: 'Right', FaceE: 'Front' },
        { FaceA: 'Up', FaceB: 'UpRight', FaceE: 'Right' },
        { FaceA: 'Up', FaceB: 'UpLeft', FaceE: 'UpRight' },
        { FaceA: 'Up', FaceB: 'Left', FaceE: 'UpLeft' },
        { FaceA: 'Up', FaceB: 'Front', FaceE: 'Left' },
      ],
    });
  }
  private createTopLayerFacePieceData(): typeof this.piecesData {
    return [
      {
        id: 10,
        position: new THREE.Vector3(0, 1.806, 0),
        rotation: new THREE.Euler(0, 2 * Radians['18deg'], 0),
        filename: 'RubikDodecahedronFacePiece.glb',
        pieceFacesToCubeFaces: { FaceA: 'Up' },
      },
    ];
  }
  private createTopEdgePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Right', FaceB: 'Front' },
        { FaceA: 'UpRight', FaceB: 'Right' },
        { FaceA: 'UpLeft', FaceB: 'UpRight' },
        { FaceA: 'Left', FaceB: 'UpLeft' },
        { FaceA: 'Front', FaceB: 'Left' },
      ],
    });
  }
  private createTopFacePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Front' },
        { FaceA: 'Right' },
        { FaceA: 'UpRight' },
        { FaceA: 'UpLeft' },
        { FaceA: 'Left' },
      ],
    });
  }
  private createTopVertexPiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'DownRight', FaceB: 'Front', FaceE: 'Right' },
        { FaceA: 'BackRight', FaceB: 'Right', FaceE: 'UpRight' },
        { FaceA: 'Back', FaceB: 'UpRight', FaceE: 'UpLeft' },
        { FaceA: 'BackLeft', FaceB: 'UpLeft', FaceE: 'Left' },
        { FaceA: 'DownLeft', FaceB: 'Left', FaceE: 'Front' },
      ],
    });
  }
  private createMiddleEdgePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Front', FaceB: 'DownRight' },
        { FaceA: 'Right', FaceB: 'DownRight' },
        { FaceA: 'Right', FaceB: 'BackRight' },
        { FaceA: 'UpRight', FaceB: 'BackRight' },
        { FaceA: 'UpRight', FaceB: 'Back' },
        { FaceA: 'UpLeft', FaceB: 'Back' },
        { FaceA: 'UpLeft', FaceB: 'BackLeft' },
        { FaceA: 'Left', FaceB: 'BackLeft' },
        { FaceA: 'Left', FaceB: 'DownLeft' },
        { FaceA: 'Front', FaceB: 'DownLeft' },
      ],
    });
  }
  private createBottomVertexPiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'Front', FaceB: 'DownRight', FaceE: 'DownLeft' },
        { FaceA: 'Right', FaceB: 'BackRight', FaceE: 'DownRight' },
        { FaceA: 'UpRight', FaceB: 'Back', FaceE: 'BackRight' },
        { FaceA: 'UpLeft', FaceB: 'BackLeft', FaceE: 'Back' },
        { FaceA: 'Left', FaceB: 'DownLeft', FaceE: 'BackLeft' },
      ],
    });
  }
  private createBottomFacePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'DownRight' },
        { FaceA: 'BackRight' },
        { FaceA: 'Back' },
        { FaceA: 'BackLeft' },
        { FaceA: 'DownLeft' },
      ],
    });
  }
  private createBottomEdgePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'DownRight', FaceB: 'DownLeft' },
        { FaceA: 'BackRight', FaceB: 'DownRight' },
        { FaceA: 'Back', FaceB: 'BackRight' },
        { FaceA: 'BackLeft', FaceB: 'Back' },
        { FaceA: 'DownLeft', FaceB: 'BackLeft' },
      ],
    });
  }
  private createBottomLayerEdgePiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceA: 'DownRight', FaceB: 'Down' },
        { FaceA: 'BackRight', FaceB: 'Down' },
        { FaceA: 'Back', FaceB: 'Down' },
        { FaceA: 'BackLeft', FaceB: 'Down' },
        { FaceA: 'DownLeft', FaceB: 'Down' },
      ],
    });
  }
  private createBottomLayerVertexPiecesData(): typeof this.piecesData {
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
      pieceFacesToCubeFaces: [
        { FaceC: 'DownLeft', FaceD: 'DownRight', FaceF: 'Down' },
        { FaceC: 'DownRight', FaceD: 'BackRight', FaceF: 'Down' },
        { FaceC: 'BackRight', FaceD: 'Back', FaceF: 'Down' },
        { FaceC: 'Back', FaceD: 'BackLeft', FaceF: 'Down' },
        { FaceC: 'BackLeft', FaceD: 'DownLeft', FaceF: 'Down' },
      ],
    });
  }
  private createBottomLayerFacePieceData(): typeof this.piecesData {
    return [
      {
        id: 61,
        position: new THREE.Vector3(0, -1.806, 0),
        rotation: new THREE.Euler(0, 0, Radians['180deg']),
        filename: 'RubikDodecahedronFacePiece.glb',
        pieceFacesToCubeFaces: { FaceA: 'Down' },
      },
    ];
  }

  private createGroupOfPiecesData(params: TCreateGroupOfPiecesDataParams): typeof this.piecesData {
    const { startIdx, count, rotationData, positionData, filename, pieceFacesToCubeFaces } = params;
    const piecesData: typeof this.piecesData = [];

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(positionData.x[i], positionData.y[i], positionData.z[i]);
      const rotation = new THREE.Euler(rotationData.x[i], rotationData.y[i], rotationData.z[i]);
      piecesData.push({
        id: startIdx + i,
        position,
        rotation,
        filename: filename,
        pieceFacesToCubeFaces: pieceFacesToCubeFaces[i],
      });
    }

    return piecesData;
  }
}

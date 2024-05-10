import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-loader';
import { RubikCube } from '../structure/cube/rubik-cube';
import { RubikCubePiecesLoader } from './rubik-cube-pieces-loader';
import { RubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { RubikCubePiece } from '../structure/piece/rubik-cube-piece';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';

export abstract class ARubikCubeFactory<TPiecesFilenames extends string, TCubeFaces extends string>
  implements IRubikCubeFactory<TPiecesFilenames, TCubeFaces>
{
  private cube: Nullable<RubikCube> = null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<TPiecesFilenames>;
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces>;

  public createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesFilenames> {
    return new RubikCubePiecesLoader();
  }
  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<TPiecesFilenames> {
    return new RubikCubePieceBuilder();
  }

  public async createRubikCube(): Promise<RubikCube> {
    if (this.cube) return this.cube;

    const data = this.createRubikCubePiecesData();
    // TODO: color the cube using these materials
    const materials = this.createRubikCubeMaterials();

    const loader = this.createRubikCubePiecesLoader();
    const builder = this.createRubikCubePieceBuilder();

    const loadedGltfPieces = await loader.loadGltfPieces(data.piecesFilenames);

    const cubePieces: Array<RubikCubePiece> = [];

    data.piecesData.forEach((pieceData) => {
      cubePieces.push(builder.createPiece(pieceData, loadedGltfPieces));
    });

    this.cube = new RubikCube(cubePieces);
    return this.cube;
  }
}

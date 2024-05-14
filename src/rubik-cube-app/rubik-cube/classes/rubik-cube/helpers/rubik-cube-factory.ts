import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-loader';
import { RubikCube } from '../structure/cube/rubik-cube';
import { RubikCubePiecesLoader } from './rubik-cube-pieces-loader';
import { RubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { RubikCubePiece } from '../structure/piece/rubik-cube-piece';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';

export abstract class ARubikCubeFactory<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
  TPiecesFaces extends string = string,
> implements IRubikCubeFactory<TPiecesWithFaces, TCubeFaces, TCubeEdgeFaces>
{
  private cube: Nullable<RubikCube> = null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<TPiecesWithFaces, TCubeFaces>;
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  public createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesWithFaces> {
    return new RubikCubePiecesLoader();
  }
  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TPiecesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  > {
    return new RubikCubePieceBuilder();
  }

  public async createRubikCube(): Promise<RubikCube> {
    if (this.cube) return this.cube;

    const data = this.createRubikCubePiecesData();
    const materials = this.createRubikCubeMaterials();

    const loader = this.createRubikCubePiecesLoader();
    const builder = this.createRubikCubePieceBuilder();

    const loadedGltfPieces = await loader.loadGltfPieces(data.piecesFilenames);

    const cubePieces: Array<RubikCubePiece> = [];

    data.piecesData.forEach((pieceData) => {
      cubePieces.push(builder.createPiece(pieceData, loadedGltfPieces, materials));
    });

    this.cube = new RubikCube(cubePieces);
    return this.cube;
  }
}

import type { TCubePieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces';
import type {
  IRubikCubePieceBuilder,
  IRubikCubePiecesBuilder,
} from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
} from '@/rubik-cube-app/rubik-cube/interfaces/data';
import { RubikCubePieceWrapper } from '../structure/piece/rubik-cube-piece-wrapper';

export class RubikCubePiecesBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeShellFilename extends string,
  TCubeFacesTextsFilename extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements IRubikCubePiecesBuilder<TCubeFacesNames, TCubeEdgeFacesNames>
{
  constructor(
    private readonly gltfLoader: IRubikCubeGLTFLoader<
      TCubeShellFilename,
      TCubePiecesFilenames,
      TCubeFacesTextsFilename
    >,
    public readonly materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
    private readonly pieceBuilder: IRubikCubePieceBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeFacesNames,
      TCubeEdgeFacesNames
    >,
    private readonly piecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFacesNames,
      TCubePiecesFilenames
    >,
  ) {}

  public async buildPieces(): Promise<TCubePieces<TCubeFacesNames>> {
    const loadedGLTFPieces = await this.gltfLoader.loadGLTFCubePieces(
      this.piecesData.piecesFilenames,
    );
    return this.piecesData.piecesInitData.map(
      (pieceData) =>
        new RubikCubePieceWrapper(
          this.pieceBuilder.buildPiece(
            loadedGLTFPieces,
            pieceData,
            this.materials,
            this.piecesData.facesNormalVectors,
          ),
        ),
    );
  }
}

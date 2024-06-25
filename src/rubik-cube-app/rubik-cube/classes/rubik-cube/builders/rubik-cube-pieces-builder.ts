import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { TCubePieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
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
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TCubeRotationGroups extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements IRubikCubePiecesBuilder
{
  constructor(
    private readonly pieceBuilder: IRubikCubePieceBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeEdgeFaces
    >,
    private readonly loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
    private readonly materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
    private readonly piecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups,
      TCubePiecesFilenames
    >['piecesData'],
  ) {}

  public buildPieces(): TCubePieces {
    return this.piecesData.map(
      (pieceData) =>
        new RubikCubePieceWrapper(
          this.pieceBuilder.createPiece(this.loadedGLTFPieces, pieceData, this.materials),
        ),
    );
  }
}

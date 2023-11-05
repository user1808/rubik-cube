import * as THREE from 'three';
import type { IRubikCubeData, TRubikCubePieceId } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type {
  TRubikCubePseudoFace,
  TRubikCubePseudoFaces,
  TRubikCubeRealFace,
  TRubikCubeRealFaces,
} from '../../types/common/RubikCubeFaces.types';
import { RubikCubePiece } from './RubikCubePiece';
import { RubikCube } from './RubikCube';
import type { RubikCubeRotationHelper } from './RubikCubeRotationHelper';

export class RubikCubeBuilder<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
  PieceCoverFaceName extends string,
  RotationTypes extends string,
> {
  constructor(
    private readonly _realFacesNamesArray: Readonly<Array<RealFacesNames>>,
    private readonly _pseudoFacesNamesArray: Readonly<Array<PseudoFacesNames>>,
  ) {}

  public buildRubikCube(
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    rotationHelper: RubikCubeRotationHelper<RealFacesNames, PseudoFacesNames, RotationTypes>,
    scene: THREE.Scene,
  ): RubikCube<RealFacesNames, PseudoFacesNames, RotationTypes> {
    const pieces = this.createPieces(loadedPiece, materials, cubeData);
    return new RubikCube(
      scene,
      this.createFaces(pieces, cubeData, materials),
      this.createFaces(pieces, cubeData),
      pieces,
      rotationHelper,
    );
  }

  private createPieces(
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): Array<RubikCubePiece> {
    const createdRubikCubePieces: Array<RubikCubePiece> = [];

    for (const { id, position } of cubeData.cubeAllPiecesBasicData) {
      const pieceClone = loadedPiece.clone();
      const pieceCloneFaces: Array<THREE.Mesh> = <Array<THREE.Mesh>>pieceClone.children;

      const pieceClonePreparedFaces: Array<
        THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
      > = pieceCloneFaces.map((face) =>
        this.assignPieceFaceMaterial(id, face, materials, cubeData),
      );

      const newRubikCubePiece = new RubikCubePiece(id, pieceClonePreparedFaces);
      newRubikCubePiece.entirePiece.position.set(position.x, position.y, position.z);
      createdRubikCubePieces.push(newRubikCubePiece);
    }

    return createdRubikCubePieces;
  }

  private assignPieceFaceMaterial(
    pieceId: TRubikCubePieceId,
    face: THREE.Mesh,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
    if (Object.keys(materials.pieceCoverFacesMaterials).includes(face.name)) {
      const faceName = face.name as keyof typeof materials.pieceCoverFacesMaterials;
      face.material = materials.pieceCoverFacesMaterials[faceName];
    } else if (Object.keys(materials.realFacesMaterials).includes(face.name)) {
      const faceName = face.name as keyof typeof materials.realFacesMaterials;
      const considerFacePiecesIds = cubeData.cubeRealFacesPiecesIds[faceName];
      face.material = considerFacePiecesIds.includes(pieceId)
        ? materials.realFacesMaterials[faceName].material
        : materials.invisiblePartsMaterial;
    } else {
      face.material = materials.invisiblePartsMaterial;
    }

    return <THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>face;
  }

  private createFaces(
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
  ): TRubikCubeRealFaces<RealFacesNames>;
  private createFaces(
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): TRubikCubePseudoFaces<PseudoFacesNames>;
  private createFaces(
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    materials?: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
  ): TRubikCubeRealFaces<RealFacesNames> | TRubikCubePseudoFaces<PseudoFacesNames> {
    const faces = (materials ? this._realFacesNamesArray : this._pseudoFacesNamesArray).reduce(
      (acc, value) => {
        return {
          ...acc,
          [value]: materials
            ? this.createFace(
                value as keyof typeof cubeData.cubeRealFacesPiecesIds,
                pieces,
                cubeData,
                materials,
              )
            : this.createFace(
                value as keyof typeof cubeData.cubePseudoFacesPiecesIds,
                pieces,
                cubeData,
              ),
        };
      },
      {} as TRubikCubeRealFaces<RealFacesNames> | TRubikCubePseudoFaces<PseudoFacesNames>,
    );
    return faces;
  }

  private createFace<T extends RealFacesNames>(
    faceName: T,
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
  ): TRubikCubeRealFace<T>;
  private createFace<T extends PseudoFacesNames>(
    faceName: T,
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): TRubikCubePseudoFace<T>;
  private createFace(
    faceName: RealFacesNames | PseudoFacesNames,
    pieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    materials?: IRubikCubeMaterials<RealFacesNames, PieceCoverFaceName>,
  ): TRubikCubeRealFace<RealFacesNames> | TRubikCubePseudoFace<PseudoFacesNames> {
    if (materials) {
      const realFaceName = faceName as keyof typeof cubeData.cubeRealFacesPiecesIds;
      return {
        faceName: realFaceName,
        pieces: cubeData.cubeRealFacesPiecesIds[realFaceName].map((idx) => {
          return {
            isRealFace: true,
            piece: pieces[idx],
            value: materials.realFacesMaterials[realFaceName].value,
          };
        }),
        normalVector: cubeData.cubeRealFacesNormalVectors[realFaceName],
      };
    } else {
      const pseudoFaceName = faceName as keyof typeof cubeData.cubePseudoFacesPiecesIds;
      return {
        faceName: pseudoFaceName,
        pieces: cubeData.cubePseudoFacesPiecesIds[pseudoFaceName].map((idx) => {
          return { isRealFace: false, piece: pieces[idx] };
        }),
      };
    }
  }
}

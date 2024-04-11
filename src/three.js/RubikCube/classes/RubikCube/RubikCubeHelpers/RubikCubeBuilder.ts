import * as THREE from 'three';
import type { IRubikCubeData } from '../../../interfaces/IRubikCubeData';
import type { IRubikCubePieceMaterials } from '../../../interfaces/IRubikCubePiecesMaterials';
import { RubikCubePiece, type TRubikCubePieceId } from '../RubikCubeStructure/RubikCubePiece';
import { RubikCube } from '../RubikCubeStructure/RubikCube';

export class RubikCubeBuilder<
  CubeRealFacesNames extends string,
  CubePseudoFacesNames extends string | never,
  PieceEdgeFacesNames extends string,
  RotationTypes extends string,
> {
  public buildRubikCube(
    scene: THREE.Scene,
    loadedPiece: THREE.Group,
    materials: IRubikCubePieceMaterials<CubeRealFacesNames, PieceEdgeFacesNames>,
    cubeData: IRubikCubeData<CubeRealFacesNames | CubePseudoFacesNames>,
  ): RubikCube<CubeRealFacesNames | CubePseudoFacesNames, RotationTypes> {
    const allPieces = this.createAllPieces(loadedPiece, materials, cubeData);

    return new RubikCube(allPieces);
  }

  private createAllPieces(
    loadedPiece: THREE.Group,
    materials: IRubikCubePieceMaterials<CubeRealFacesNames, PieceEdgeFacesNames>,
    cubeData: IRubikCubeData<CubeRealFacesNames | CubePseudoFacesNames>,
  ): Array<RubikCubePiece> {
    const createdPieces: Array<RubikCubePiece> = [];

    for (const { id, position } of cubeData.piecesBasicData) {
      const loadedPieceFaces: Array<THREE.Mesh> = loadedPiece.children.filter(
        (child) => child instanceof THREE.Mesh,
      ) as Array<THREE.Mesh>;

      const newPiece: RubikCubePiece = this.createPiece(id, loadedPieceFaces, materials, cubeData);

      newPiece.setPosition(position);
      createdPieces.push(newPiece);
    }

    return createdPieces;
  }

  private createPiece(
    id: TRubikCubePieceId,
    loadedPieceFaces: Array<THREE.Mesh>,
    materials: IRubikCubePieceMaterials<CubeRealFacesNames, PieceEdgeFacesNames>,
    cubeData: IRubikCubeData<CubeRealFacesNames | CubePseudoFacesNames>,
  ): RubikCubePiece {
    const otherFaces: Array<TRubikCubePieceHiddenFace> = [];

    loadedPieceFaces.forEach((pieceFace) => {
      if (
        !this.checkFaceName(materials.pieceEdgeFacesMaterials, pieceFace.name) &&
        !this.checkFaceName(materials.pieceVisibleFacesMaterials, pieceFace.name)
      ) {
        return;
      }

      const faceName = pieceFace.name;
      const createdPieceFace = this.createPieceFace(id, faceName, pieceFace, materials, cubeData);

      otherFaces.push(createdPieceFace);
    });

    return new RubikCubePiece(id, otherFaces);
  }

  private createPieceFace(
    pieceId: TRubikCubePieceId,
    faceName: CubeRealFacesNames | PieceEdgeFacesNames,
    loadedPieceFace: THREE.Mesh,
    materials: IRubikCubePieceMaterials<CubeRealFacesNames, PieceEdgeFacesNames>,
    cubeData: IRubikCubeData<CubeRealFacesNames, CubePseudoFacesNames>,
  ): TRubikCubePieceHiddenFace {
    const newPieceFace = new THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>(
      loadedPieceFace.geometry,
    );
    newPieceFace.scale.copy(loadedPieceFace.scale);
    if (this.checkFaceName(materials.pieceEdgeFacesMaterials, faceName)) {
      newPieceFace.material = materials.pieceEdgeFacesMaterials[faceName];
      return newPieceFace;
    } else {
      if (cubeData.initFacesPiecesIdx[faceName].includes(pieceId)) {
        newPieceFace.material = materials.pieceVisibleFacesMaterials[faceName];
        return newPieceFace;
      } else {
        newPieceFace.material = materials.pieceHiddenFacesMaterial;
        return newPieceFace;
      }
    }
  }

  private checkFaceName<T extends string>(
    recordWithFacesNamesKeys: Record<T, unknown>,
    faceName: string,
  ): faceName is T {
    return Object.keys(recordWithFacesNamesKeys).includes(faceName);
  }
}

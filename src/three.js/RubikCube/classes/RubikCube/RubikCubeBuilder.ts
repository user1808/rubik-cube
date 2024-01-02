import * as THREE from 'three';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import {
  RubikCubePiece,
  type TRubikCubePieceId,
  type TRubikCubePieceOtherFace,
} from './RubikCubePiece/RubikCubePiece';
import { RubikCube, type TRubikCubeFaces } from './RubikCube';
import { RubikCubePieceVisibleFace } from './RubikCubePiece/RubikCubePieceVisibleFace';
import { RubikCubeFace } from './RubikCubeFace';
import type {
  IRubikCubeRotationData,
  TRubikCubeFaceRotationData,
} from '../../interfaces/IRubikCubeRotationData';

export class RubikCubeBuilder<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
  PieceCoverFacesNames extends string,
  RotationTypes extends string,
> {
  constructor(
    private readonly _allFacesNamesArray: Readonly<Array<RealFacesNames | PseudoFacesNames>>,
  ) {}

  public buildRubikCube(
    scene: THREE.Scene,
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    rotationData: IRubikCubeRotationData<RealFacesNames | PseudoFacesNames, RotationTypes>,
  ): RubikCube<RealFacesNames | PseudoFacesNames, RotationTypes> {
    const allPieces = this.createAllPieces(loadedPiece, materials, cubeData);
    const allFaces = this.createAllFaces(scene, allPieces, cubeData, rotationData);

    return new RubikCube(scene, allFaces, allPieces);
  }

  private createAllPieces(
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): Array<RubikCubePiece> {
    const createdPieces: Array<RubikCubePiece> = [];

    for (const { id, position } of cubeData.basicDataOfAllCubePieces) {
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
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): RubikCubePiece {
    const realFaces: Array<RubikCubePieceVisibleFace> = [];
    const otherFaces: Array<TRubikCubePieceOtherFace> = [];

    loadedPieceFaces.forEach((pieceFace) => {
      if (
        !this.checkFaceName(materials.pieceCoverFacesMaterials, pieceFace.name) &&
        !this.checkFaceName(materials.pieceVisibleFacesMaterials, pieceFace.name)
      ) {
        return;
      }

      const faceName = pieceFace.name;
      const createdPieceFace = this.createPieceFace(id, faceName, pieceFace, materials, cubeData);

      if (createdPieceFace instanceof RubikCubePieceVisibleFace) {
        realFaces.push(createdPieceFace);
      } else {
        otherFaces.push(createdPieceFace);
      }
    });

    return new RubikCubePiece(id, realFaces, otherFaces);
  }

  private createPieceFace(
    pieceId: TRubikCubePieceId,
    faceName: RealFacesNames | PieceCoverFacesNames,
    loadedPieceFace: THREE.Mesh,
    materials: IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
  ): RubikCubePieceVisibleFace | TRubikCubePieceOtherFace {
    const newPieceFace = new THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>(
      loadedPieceFace.geometry,
    );
    newPieceFace.scale.copy(loadedPieceFace.scale);
    if (this.checkFaceName(materials.pieceCoverFacesMaterials, faceName)) {
      newPieceFace.material = materials.pieceCoverFacesMaterials[faceName];
      return newPieceFace;
    } else {
      if (cubeData.initPiecesIdxsOfAllFaces[faceName].includes(pieceId)) {
        const newVisibleFace = new RubikCubePieceVisibleFace(
          newPieceFace.geometry,
          materials.pieceVisibleFacesMaterials[faceName],
          cubeData.initNormalsOfRealFaces[faceName].clone(),
        );
        newVisibleFace.scale.copy(newPieceFace.scale);
        return newVisibleFace;
      } else {
        newPieceFace.material = materials.pieceInvisibleFacesMaterial;
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

  private createAllFaces(
    scene: THREE.Scene,
    allPieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    rotationData: IRubikCubeRotationData<RealFacesNames | PseudoFacesNames, RotationTypes>,
  ): TRubikCubeFaces<RealFacesNames | PseudoFacesNames, RotationTypes> {
    return this._allFacesNamesArray.reduce(
      (acc, faceName) => {
        return {
          ...acc,
          [faceName]: this.createFace(
            scene,
            faceName,
            allPieces,
            cubeData,
            rotationData.rotationData[faceName],
          ),
        };
      },
      {} as TRubikCubeFaces<RealFacesNames | PseudoFacesNames, RotationTypes>,
    );
  }

  private createFace(
    scene: THREE.Scene,
    faceName: RealFacesNames | PseudoFacesNames,
    allPieces: Array<RubikCubePiece>,
    cubeData: IRubikCubeData<RealFacesNames, PseudoFacesNames>,
    faceRotationData: TRubikCubeFaceRotationData<RotationTypes>,
  ): RubikCubeFace<RealFacesNames | PseudoFacesNames, RotationTypes> {
    return new RubikCubeFace(
      scene,
      faceName,
      cubeData.initPiecesIdxsOfAllFaces[faceName].map((id) => allPieces[id]),
      faceRotationData,
      this.checkFaceName(cubeData.initNormalsOfRealFaces, faceName)
        ? cubeData.initNormalsOfRealFaces[faceName].clone()
        : undefined,
    );
  }
}

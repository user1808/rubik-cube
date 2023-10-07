import * as THREE from 'three';
import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { TRubikCubeCoverFaceName } from '../../types/RubikCubeCoverFaceName';
import type { TRubikCubeCommonFaceNames } from '../../types/RubikCubeCommonFaceNames';
import { RubikCubeCreator } from '../abstract/RubikCubeCreator';
import type { TRubikCubeFaceMaterials } from '../../types/RubikCubeFaceMaterials';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import { RubikCube3x3 } from './RubikCube3x3';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import { RubikCubePiece } from '../RubikCubePiece';

export class RubikCube3x3Creator extends RubikCubeCreator<
  TRubikCubeCommonFaceNames,
  TRubikCubeCoverFaceName
> {
  constructor(
    private readonly originalPiece: THREE.Group,
    private readonly faceMaterials: TRubikCubeFaceMaterials<
      TRubikCubeCommonFaceNames | TRubikCubeCoverFaceName
    >,
    private readonly invisiblePartsMaterial: THREE.MeshBasicMaterial,
    private readonly cubeData: IRubikCubeData<TRubikCubeCommonFaceNames>,
  ) {
    super();
  }

  createRubikCube(): IRubikCube<TRubikCubeCommonFaceNames, 'Cover'> {
    const faces: Map<
      TRubikCubeCommonFaceNames,
      Array<IRubikCubePiece<TRubikCubeCommonFaceNames, TRubikCubeCoverFaceName>>
    > = new Map();
    const pieces: Array<IRubikCubePiece<TRubikCubeCommonFaceNames, TRubikCubeCoverFaceName>> = [];

    for (const { id, position } of this.cubeData.cubePiecesBasicData) {
      const pieceClone = this.originalPiece.clone();
      const pieceCloneFaces: Array<THREE.Mesh> = <Array<THREE.Mesh>>pieceClone.children;

      const visibleFacesNames = this.getNamesVisiblePieceFaces(position);
      const pieceClonePreparedFaces: Map<
        TRubikCubeCommonFaceNames | TRubikCubeCoverFaceName,
        THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
      > = new Map(
        pieceCloneFaces
          .filter((face) => {
            return Object.keys(this.faceMaterials).includes(face.name);
          })
          .map((face) => {
            const faceName = face.name as TRubikCubeCommonFaceNames | TRubikCubeCoverFaceName;
            face.material = visibleFacesNames.includes(faceName)
              ? this.faceMaterials[faceName]
              : this.invisiblePartsMaterial;
            return [faceName, face as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>];
          }),
      );
      pieces.push(new RubikCubePiece(id, pieceClonePreparedFaces, position));
    }

    for (const faceName in this.cubeData.cubeFacePiecesIdxs) {
      const key = faceName as TRubikCubeCommonFaceNames;
      faces.set(
        key,
        this.cubeData.cubeFacePiecesIdxs[key].map((idx) => pieces[idx]),
      );
    }

    return new RubikCube3x3(faces, pieces);
  }

  private getNamesVisiblePieceFaces(
    piecePosition: THREE.Vector3,
  ): Array<TRubikCubeCommonFaceNames | TRubikCubeCoverFaceName> {
    const visibleFaces: Array<TRubikCubeCommonFaceNames | TRubikCubeCoverFaceName> = ['Cover'];
    const { x, y, z } = piecePosition;
    if (x > 0) {
      visibleFaces.push('RightFace');
    } else if (x < 0) {
      visibleFaces.push('LeftFace');
    }

    if (y > 0) {
      visibleFaces.push('TopFace');
    } else if (y < 0) {
      visibleFaces.push('DownFace');
    }

    if (z > 0) {
      visibleFaces.push('FrontFace');
    } else if (z < 0) {
      visibleFaces.push('BackFace');
    }

    return visibleFaces;
  }
}

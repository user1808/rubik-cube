import * as THREE from 'three';
import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubeCreator } from '../../interfaces/IRubikCubeCreator';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';
import { RubikCube3x3 } from './RubikCube3x3';
import { RubikCube3x3Piece } from './RubikCube3x3Piece';
import type { TRubikCubeFacePiece } from '../../types/common/TRubikCubeFacePiece';

export class RubikCube3x3Creator
  implements IRubikCubeCreator<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>
{
  createRubikCube(
    loadedPiece: THREE.Group,
    materials: IRubikCubeMaterials<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>,
    cubeData: IRubikCubeData<TRubikCube3x3FaceNames>,
  ): IRubikCube<TRubikCube3x3FaceNames> {
    const faces: Map<TRubikCube3x3FaceNames, Array<TRubikCubeFacePiece>> = new Map();
    const pieces: Array<IRubikCubePiece> = [];

    for (const { id, position } of cubeData.cubePiecesBasicData) {
      const pieceClone = loadedPiece.clone();
      const pieceCloneFaces: Array<THREE.Mesh> = <Array<THREE.Mesh>>pieceClone.children;

      const visibleFacesNames = this.getNamesVisiblePieceFaces(position);
      const pieceClonePreparedFaces: Array<
        THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
      > = pieceCloneFaces
        .filter((face) => {
          return Object.keys(materials.faceMaterials).includes(face.name);
        })
        .map((face) => {
          const faceName = face.name as TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName;
          face.material = visibleFacesNames.includes(faceName)
            ? materials.faceMaterials[faceName].material
            : materials.invisiblePartsMaterial;
          return face as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
        });
      const newPiece = new RubikCube3x3Piece(id, pieceClonePreparedFaces);
      newPiece.entirePiece.position.set(position.x, position.y, position.z);
      pieces.push(newPiece);
    }

    for (const faceName in cubeData.cubeFacePiecesIdxs) {
      const key = faceName as TRubikCube3x3FaceNames;
      faces.set(
        key,
        cubeData.cubeFacePiecesIdxs[key].map((idx) => {
          return {
            piece: pieces[idx],
            value: materials.faceMaterials[key].value,
          };
        }),
      );
    }

    return new RubikCube3x3(faces, pieces);
  }

  private getNamesVisiblePieceFaces(
    piecePosition: THREE.Vector3,
  ): Array<TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName> {
    const visibleFaces: Array<TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName> = ['Cover'];
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

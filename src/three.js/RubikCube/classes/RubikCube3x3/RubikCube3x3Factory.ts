import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeFactory } from '../../interfaces/IRubikCubeFactory';
import type { IRubikCubePiece } from '../../interfaces/IRubikCubePiece';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from '../../interfaces/IRubikCubeRotationHelper';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import { RubikCube3x3 } from './RubikCube3x3';
import { RubikCube3x3Data } from './RubikCube3x3Data';
import { RubikCube3x3RotationData } from './RubikCube3x3RotationData';
import { RubikCube3x3RotationHelper } from './RubikCube3x3RotationHelper';
import { RubikCube3x3Piece } from './RubikCube3x3Piece';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import { RubikCube3x3Materials } from './RubikCube3x3Materials';
import type { IRubikCubeRayCastingData } from '../../interfaces/IRubikCubeRayCastingData';
import { RubikCube3x3RayCastingData } from './RubikCube3x3RayCastingData';

export class RubikCube3x3Factory
  implements
    IRubikCubeFactory<
      TRubikCube3x3FaceNames,
      TRubikCube3x3PieceCoverName,
      TRubikCube3x3RotationTypes
    >
{
  constructor(private readonly originalPiece: THREE.Group) {}

  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TRubikCube3x3FaceNames,
    TRubikCube3x3PieceCoverName
  > {
    return new RubikCube3x3Materials();
  }

  public createRubikCubeData(): IRubikCubeData<TRubikCube3x3FaceNames> {
    return new RubikCube3x3Data();
  }

  public createRubikCube(): IRubikCube<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName> {
    const materials = this.createRubikCubeMaterials();
    const faces: Map<
      TRubikCube3x3FaceNames,
      Array<IRubikCubePiece<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>>
    > = new Map();
    const pieces: Array<IRubikCubePiece<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>> = [];
    const cubeData = this.createRubikCubeData();

    for (const { id, position } of cubeData.cubePiecesBasicData) {
      const pieceClone = this.originalPiece.clone();
      const pieceCloneFaces: Array<THREE.Mesh> = <Array<THREE.Mesh>>pieceClone.children;

      const visibleFacesNames = this.getNamesVisiblePieceFaces(position);
      const pieceClonePreparedFaces: Map<
        TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName,
        THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
      > = new Map(
        pieceCloneFaces
          .filter((face) => {
            return Object.keys(materials.faceMaterials).includes(face.name);
          })
          .map((face) => {
            const faceName = face.name as TRubikCube3x3FaceNames | TRubikCube3x3PieceCoverName;
            face.material = visibleFacesNames.includes(faceName)
              ? materials.faceMaterials[faceName]
              : materials.invisiblePartsMaterial;
            return [faceName, face as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>];
          }),
      );
      const newPiece = new RubikCube3x3Piece(id, pieceClonePreparedFaces);
      newPiece.entirePiece.position.set(position.x, position.y, position.z);
      pieces.push(newPiece);
    }

    for (const faceName in cubeData.cubeFacePiecesIdxs) {
      const key = faceName as TRubikCube3x3FaceNames;
      faces.set(
        key,
        cubeData.cubeFacePiecesIdxs[key].map((idx) => pieces[idx]),
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

  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    return new RubikCube3x3RotationData();
  }

  public createRubikCubeRotationHelper(): IRubikCubeRotationHelper<
    TRubikCube3x3FaceNames,
    TRubikCube3x3PieceCoverName,
    TRubikCube3x3RotationTypes
  > {
    const rotationData = this.createRubikCubeRotationData();
    const cubeData = this.createRubikCubeData();
    return new RubikCube3x3RotationHelper(rotationData, cubeData);
  }

  public createRubikCubeRayCastingData(): IRubikCubeRayCastingData<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    return new RubikCube3x3RayCastingData();
  }
}

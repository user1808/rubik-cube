import * as THREE from 'three';
import type { IRubikCubeRayCastingData } from '../../interfaces/IRubikCubeRayCastingData';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';

export class RubikCube3x3RayCastingData
  implements IRubikCubeRayCastingData<TRubikCube3x3FaceNames, TRubikCube3x3RotationTypes>
{
  private readonly _faceSelectionConditions: typeof this.faceSelectionConditions = {
    TopFace: (intersection: THREE.Intersection) => this.isFaceUp(intersection),
    DownFace: (intersection: THREE.Intersection) => this.isFaceDown(intersection),
    FrontFace: (intersection: THREE.Intersection) => this.isFaceFront(intersection),
    BackFace: (intersection: THREE.Intersection) => this.isFaceBack(intersection),
    RightFace: (intersection: THREE.Intersection) => this.isFaceRight(intersection),
    LeftFace: (intersection: THREE.Intersection) => this.isFaceLeft(intersection),
  };

  private readonly _selectedPiecesRotationType: typeof this.selectedPiecesRotationType = {
    FrontFace: this.createRotationTypes('FrontFace'),
    DownFace: this.createRotationTypes('DownFace'),
    TopFace: this.createRotationTypes('TopFace'),
    BackFace: this.createRotationTypes('BackFace'),
    RightFace: this.createRotationTypes('RightFace'),
    LeftFace: this.createRotationTypes('LeftFace'),
  };

  public get faceSelectionConditions(): Record<
    TRubikCube3x3FaceNames,
    (selectedPieceFaceIntersection: THREE.Intersection) => boolean
  > {
    return this._faceSelectionConditions;
  }

  public get selectedPiecesRotationType(): Record<
    TRubikCube3x3FaceNames,
    {
      faceSelectedPiecesIdxs: number[];
      faceToRotate: TRubikCube3x3FaceNames;
      rotationType: TRubikCube3x3RotationTypes;
    }[]
  > {
    return this._selectedPiecesRotationType;
  }

  private calculatedPieceFaceNormal(intersection: THREE.Intersection): THREE.Vector3 {
    const normal = new THREE.Vector3();
    const entirePiece = intersection.object.parent;
    if (!entirePiece || !(entirePiece instanceof THREE.Group)) {
      return normal;
    }

    const intersectionNormal = intersection.normal;
    if (!intersectionNormal) {
      return normal;
    }

    normal.set(intersectionNormal.x, intersectionNormal.y, intersectionNormal.z);
    normal.applyQuaternion(entirePiece.quaternion);

    return normal;
  }

  private isFaceUp(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).y > 0.95;
  }

  private isFaceDown(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).y < -0.95;
  }

  private isFaceFront(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).z > 0.95;
  }

  private isFaceBack(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).z < -0.95;
  }

  private isFaceRight(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).x > 0.95;
  }

  private isFaceLeft(intersection: THREE.Intersection): boolean {
    return this.calculatedPieceFaceNormal(intersection).x < 0.95;
  }

  private createRotationTypes(
    face: TRubikCube3x3FaceNames,
  ): (typeof this.selectedPiecesRotationType)[TRubikCube3x3FaceNames] {
    const rotationPatterns: Record<TRubikCube3x3FaceNames, TRubikCube3x3FaceNames[]> = {
      TopFace: ['BackFace', 'LeftFace', 'RightFace', 'FrontFace'],
      DownFace: ['FrontFace', 'LeftFace', 'RightFace', 'BackFace'],
      FrontFace: ['TopFace', 'LeftFace', 'RightFace', 'DownFace'],
      BackFace: ['TopFace', 'RightFace', 'LeftFace', 'DownFace'],
      RightFace: ['TopFace', 'FrontFace', 'BackFace', 'DownFace'],
      LeftFace: ['TopFace', 'BackFace', 'FrontFace', 'DownFace'],
    };
    return [
      {
        faceSelectedPiecesIdxs: [2, 1, 0],
        rotationType: 'Clockwise',
        faceToRotate: rotationPatterns[face][0],
      },
      {
        faceSelectedPiecesIdxs: [0, 1, 2],
        rotationType: 'CounterClockwise',
        faceToRotate: rotationPatterns[face][0],
      },
      {
        faceSelectedPiecesIdxs: [0, 3, 6],
        rotationType: 'Clockwise',
        faceToRotate: rotationPatterns[face][1],
      },
      {
        faceSelectedPiecesIdxs: [6, 3, 0],
        rotationType: 'CounterClockwise',
        faceToRotate: rotationPatterns[face][1],
      },
      {
        faceSelectedPiecesIdxs: [8, 5, 2],
        rotationType: 'Clockwise',
        faceToRotate: rotationPatterns[face][2],
      },
      {
        faceSelectedPiecesIdxs: [2, 5, 8],
        rotationType: 'CounterClockwise',
        faceToRotate: rotationPatterns[face][2],
      },
      {
        faceSelectedPiecesIdxs: [6, 7, 8],
        rotationType: 'Clockwise',
        faceToRotate: rotationPatterns[face][3],
      },
      {
        faceSelectedPiecesIdxs: [8, 7, 6],
        rotationType: 'CounterClockwise',
        faceToRotate: rotationPatterns[face][3],
      },
    ];
  }
}

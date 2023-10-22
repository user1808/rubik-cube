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
    SliceXFace: () => false,
    SliceYFace: () => false,
    SliceZFace: () => false,
  };

  private readonly _selectedPiecesRotationType: typeof this.selectedPiecesRotationType = {
    FrontFace: this.createRotationTypes('FrontFace'),
    DownFace: this.createRotationTypes('DownFace'),
    TopFace: this.createRotationTypes('TopFace'),
    BackFace: this.createRotationTypes('BackFace'),
    RightFace: this.createRotationTypes('RightFace'),
    LeftFace: this.createRotationTypes('LeftFace'),
    SliceXFace: [],
    SliceYFace: [],
    SliceZFace: [],
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
    face: Exclude<TRubikCube3x3FaceNames, 'SliceXFace' | 'SliceYFace' | 'SliceZFace'>,
  ): (typeof this.selectedPiecesRotationType)[TRubikCube3x3FaceNames] {
    const rotationPatterns: Record<
      Exclude<TRubikCube3x3FaceNames, 'SliceXFace' | 'SliceYFace' | 'SliceZFace'>,
      { face: TRubikCube3x3FaceNames; altRotation?: boolean }[]
    > = {
      TopFace: [
        { face: 'BackFace' },
        { face: 'LeftFace' },
        { face: 'RightFace' },
        { face: 'FrontFace' },
        { face: 'SliceXFace' },
        { face: 'SliceZFace', altRotation: true },
      ],
      DownFace: [
        { face: 'FrontFace' },
        { face: 'LeftFace' },
        { face: 'RightFace' },
        { face: 'BackFace' },
        { face: 'SliceXFace' },
        { face: 'SliceZFace' },
      ],
      FrontFace: [
        { face: 'TopFace' },
        { face: 'LeftFace' },
        { face: 'RightFace' },
        { face: 'DownFace' },
        { face: 'SliceXFace' },
        { face: 'SliceYFace' },
      ],
      BackFace: [
        { face: 'TopFace' },
        { face: 'RightFace' },
        { face: 'LeftFace' },
        { face: 'DownFace' },
        { face: 'SliceXFace', altRotation: true },
        { face: 'SliceYFace' },
      ],
      RightFace: [
        { face: 'TopFace' },
        { face: 'FrontFace' },
        { face: 'BackFace' },
        { face: 'DownFace' },
        { face: 'SliceZFace', altRotation: true },
        { face: 'SliceYFace' },
      ],
      LeftFace: [
        { face: 'TopFace' },
        { face: 'BackFace' },
        { face: 'FrontFace' },
        { face: 'DownFace' },
        { face: 'SliceZFace' },
        { face: 'SliceYFace' },
      ],
    };
    return [
      {
        faceSelectedPiecesIdxs: [2, 1, 0],
        rotationType: rotationPatterns[face][0].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][0].face,
      },
      {
        faceSelectedPiecesIdxs: [0, 1, 2],
        rotationType: rotationPatterns[face][0].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][0].face,
      },
      {
        faceSelectedPiecesIdxs: [0, 3, 6],
        rotationType: rotationPatterns[face][1].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][1].face,
      },
      {
        faceSelectedPiecesIdxs: [6, 3, 0],
        rotationType: rotationPatterns[face][1].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][1].face,
      },
      {
        faceSelectedPiecesIdxs: [8, 5, 2],
        rotationType: rotationPatterns[face][2].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][2].face,
      },
      {
        faceSelectedPiecesIdxs: [2, 5, 8],
        rotationType: rotationPatterns[face][2].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][2].face,
      },
      {
        faceSelectedPiecesIdxs: [6, 7, 8],
        rotationType: rotationPatterns[face][3].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][3].face,
      },
      {
        faceSelectedPiecesIdxs: [8, 7, 6],
        rotationType: rotationPatterns[face][3].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][3].face,
      },
      {
        faceSelectedPiecesIdxs: [7, 4, 1],
        rotationType: rotationPatterns[face][4].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][4].face,
      },
      {
        faceSelectedPiecesIdxs: [1, 4, 7],
        rotationType: rotationPatterns[face][4].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][4].face,
      },
      {
        faceSelectedPiecesIdxs: [3, 4, 5],
        rotationType: rotationPatterns[face][5].altRotation ? 'Clockwise' : 'CounterClockwise',
        faceToRotate: rotationPatterns[face][5].face,
      },
      {
        faceSelectedPiecesIdxs: [5, 4, 3],
        rotationType: rotationPatterns[face][5].altRotation ? 'CounterClockwise' : 'Clockwise',
        faceToRotate: rotationPatterns[face][5].face,
      },
    ];
  }
}

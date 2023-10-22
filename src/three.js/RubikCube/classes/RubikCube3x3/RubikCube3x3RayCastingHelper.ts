import * as THREE from 'three';
import type { IRubikCubeRayCastingHelper } from '../../interfaces/IRubikCubeRayCastingHelper';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { IRubikCubeRayCastingData } from '../../interfaces/IRubikCubeRayCastingData';
import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';

type TPieceWithId = THREE.Object3D & {
  userData: { id: number };
};

export class RubikCube3x3RayCastingHelper
  implements IRubikCubeRayCastingHelper<TRubikCube3x3FaceNames, TRubikCube3x3RotationTypes>
{
  private isRayCastingEnable: boolean = false;
  private rayCastedFace: TRubikCube3x3FaceNames | null = null;
  private rayCastedPiecesIds: Set<number> = new Set();

  constructor(
    private readonly rayCastingData: IRubikCubeRayCastingData<
      TRubikCube3x3FaceNames,
      TRubikCube3x3RotationTypes
    >,
    private readonly cube: IRubikCube<TRubikCube3x3FaceNames, TRubikCube3x3PieceCoverName>,
  ) {
    window.addEventListener('mousedown', () => {
      this.isRayCastingEnable = true;
    });
    window.addEventListener('touchstart', () => {
      this.isRayCastingEnable = true;
    });
    window.addEventListener('mouseup', () => {
      this.isRayCastingEnable = false;
      this.rayCastedPiecesIds.clear();
      this.rayCastedFace = null;
    });
    window.addEventListener('touchend', () => {
      this.isRayCastingEnable = false;
      this.rayCastedPiecesIds.clear();
      this.rayCastedFace = null;
    });
  }

  public checkIntersecton(intersection: THREE.Intersection | undefined): {
    face: TRubikCube3x3FaceNames;
    rotation: TRubikCube3x3RotationTypes;
  } | null {
    if (!this.isRayCastingEnable || !intersection) {
      return null;
    }
    const piece = intersection.object.parent;
    if (!this.isPieceHaveId(piece)) {
      return null;
    }
    this.setWhatIsRaycasted(intersection, piece);
    return this.getRotationData();
  }

  private isPieceHaveId(piece: THREE.Object3D | null): piece is TPieceWithId {
    return !!piece && typeof piece.userData.id === 'number';
  }

  private setWhatIsRaycasted(intersection: THREE.Intersection, intersectPiece: TPieceWithId): void {
    if (!this.rayCastedFace) {
      const currentlyRaycastedFace = Object.entries(
        this.rayCastingData.faceSelectionConditions,
      ).find((face) => face[1](intersection));
      if (currentlyRaycastedFace) {
        this.rayCastedFace = currentlyRaycastedFace[0] as TRubikCube3x3FaceNames;
      }
    }
    if (this.rayCastedPiecesIds.size < 3) {
      this.rayCastedPiecesIds.add(intersectPiece.userData.id);
    }
  }

  private getRotationData(): ReturnType<typeof this.checkIntersecton> {
    if (!this.rayCastedFace || this.rayCastedPiecesIds.size !== 3) {
      return null;
    }
    const selectedFacePieces = this.cube.faces.get(this.rayCastedFace);
    if (!selectedFacePieces) {
      return null;
    }
    const selectedFacePiecesIds = selectedFacePieces.map((piece) => piece.id);

    const rotationType = this.rayCastingData.selectedPiecesRotationType[this.rayCastedFace].find(
      ({ faceSelectedPiecesIdxs }) => {
        const cubePiecesIds = faceSelectedPiecesIdxs.map(
          (facePieceId) => selectedFacePiecesIds[facePieceId],
        );
        return this.areIdsArraysIdentical(cubePiecesIds, Array.from(this.rayCastedPiecesIds));
      },
    );

    if (!rotationType) {
      return null;
    }

    this.rayCastedFace = null;
    this.rayCastedPiecesIds.clear();
    this.isRayCastingEnable = false;
    return { face: rotationType.faceToRotate, rotation: rotationType.rotationType };
  }

  private areIdsArraysIdentical(firstArray: Array<number>, secondArray: Array<number>): boolean {
    if (firstArray.length !== secondArray.length) {
      return false;
    }

    return firstArray.every((value, index) => value === secondArray[index]);
  }
}

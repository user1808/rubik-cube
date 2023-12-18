import * as THREE from 'three';
import type { IRubikCubeRayCastingHelper } from './IRubikCubeRayCastingHelper';
import type { IRubikCubeRayCastingData } from './IRubikCubeRayCastingData';
import type { RubikCube } from '../../interfaces/AbstractRubikCube';
import type { TRubikCube3x3RealFacesNames } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { TRubikCube3x3PseudoFacesNames } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import type { TRubikCube3x3FacesRelations } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3FacesRelations';
import type { TRubikCube3x3AllFaceNames } from '../../types/RubikCube3x3/TRubikCube3x3AllFaceNames';

type TPieceWithId = THREE.Group & {
  userData: { id: number };
};

export class RubikCube3x3RayCastingHelper
  implements
    IRubikCubeRayCastingHelper<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >
{
  private isRayCastingEnable: boolean = false;
  private rayCastedFace: Nullable<TRubikCube3x3RealFacesNames> = null;
  private rayCastedPiece: Nullable<TPieceWithId> = null;

  constructor(
    private readonly rayCastingData: IRubikCubeRayCastingData<TRubikCube3x3RealFacesNames>,
  ) {
    window.addEventListener('mousedown', () => {
      this.isRayCastingEnable = true;
    });
    window.addEventListener('touchstart', () => {
      this.isRayCastingEnable = true;
    });
    window.addEventListener('mousemove', () => {});
    window.addEventListener('touchmove', () => {});
    window.addEventListener('mouseup', () => {
      this.isRayCastingEnable = false;
      this.rayCastedPiece = null;
      this.rayCastedFace = null;
    });
    window.addEventListener('touchend', () => {
      this.isRayCastingEnable = false;
      this.rayCastedPiece = null;
      this.rayCastedFace = null;
    });
  }

  public calculatedPieceFaceNormal(intersection: THREE.Intersection): THREE.Vector3 {
    const normal = new THREE.Vector3();
    if (!this.rayCastedPiece) {
      return normal;
    }

    const intersectionNormal = intersection.normal;
    if (!intersectionNormal) {
      return normal;
    }

    normal.set(intersectionNormal.x, intersectionNormal.y, intersectionNormal.z);
    normal.applyQuaternion(this.rayCastedPiece.quaternion);
    normal.round();

    return normal;
  }

  public checkIntersecton(
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
    intersection: THREE.Intersection | undefined,
  ): Nullable<{
    raycastedFace: Exclude<TRubikCube3x3AllFaceNames, void>;
    pieceId: number;
  }> {
    if (!this.isRayCastingEnable || !intersection) {
      return null;
    }
    this.setRayCastingPieceAndFace(intersection, cube);
    return !this.rayCastedFace || !this.rayCastedPiece
      ? null
      : {
          pieceId: this.rayCastedPiece.userData.id,
          raycastedFace: this.rayCastedFace,
        };
  }

  private setRayCastingPieceAndFace(
    intersection: THREE.Intersection,
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
  ) {
    this.setRayCastedPiece(intersection);
    this.setRayCastedFace(intersection, cube);
  }

  private setRayCastedFace(
    intersection: THREE.Intersection,
    cube: RubikCube<
      TRubikCube3x3RealFacesNames,
      TRubikCube3x3PseudoFacesNames,
      TRubikCube3x3FacesRelations
    >,
  ): void {
    if (this.rayCastedFace) {
      return;
    }
    const pieceFaceNormal = this.calculatedPieceFaceNormal(intersection);
    const currentlyRaycastedFace = Object.entries(cube.faces).find((face) =>
      'normalVector' in face[1] ? face[1].normalVector.equals(pieceFaceNormal) : false,
    );
    this.rayCastedFace = <TRubikCube3x3RealFacesNames>currentlyRaycastedFace?.[0] ?? null;
  }

  private isPieceHaveId(piece: Nullable<THREE.Object3D>): piece is TPieceWithId {
    return !!piece && typeof piece.userData.id === 'number';
  }

  private setRayCastedPiece(intercestion: THREE.Intersection) {
    if (this.rayCastedPiece) {
      return;
    }
    const piece = intercestion.object.parent;
    this.rayCastedPiece = this.isPieceHaveId(piece) ? piece : null;
  }
}

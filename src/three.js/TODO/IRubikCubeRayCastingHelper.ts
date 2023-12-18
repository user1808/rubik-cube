import * as THREE from 'three';
import type { RubikCube } from './AbstractRubikCube';
import type { TRubikCubeFaceRelations } from '../RubikCube/types/common/RubikCubeFaces.types';

export interface IRubikCubeRayCastingHelper<
  RealFaceNames extends string,
  PseudoFaceNames extends string | void,
  FaceRelations extends TRubikCubeFaceRelations<Exclude<RealFaceNames | PseudoFaceNames, void>>,
> {
  calculatedPieceFaceNormal(intersection: THREE.Intersection): THREE.Vector3;
  checkIntersecton(
    cube: RubikCube<RealFaceNames, PseudoFaceNames, FaceRelations>,
    instersection: THREE.Intersection,
  ): Nullable<{
    raycastedFace: Exclude<RealFaceNames | PseudoFaceNames, void>;
    pieceId: number;
  }>;
}

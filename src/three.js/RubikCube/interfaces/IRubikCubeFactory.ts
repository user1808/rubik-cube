import type { IRubikCube } from './IRubikCube';
import type { IRubikCubeData } from './IRubikCubeData';
import type { IRubikCubeMaterials } from './IRubikCubeMaterials';
import type { IRubikCubeRayCastingData } from './IRubikCubeRayCastingData';
import type { IRubikCubeRayCastingHelper } from './IRubikCubeRayCastingHelper';
import type { IRubikCubeRotationData } from './IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from './IRubikCubeRotationHelper';

export abstract class IRubikCubeFactory<
  FaceNames extends string,
  PieceCoverFaceName extends string,
  RotationTypes extends string,
> {
  constructor(protected readonly originalPiece: THREE.Group) {}

  abstract createRubikCubeMaterials(): IRubikCubeMaterials<FaceNames, PieceCoverFaceName>;
  abstract createRubikCubeData(): IRubikCubeData<FaceNames>;
  abstract createRubikCube(): IRubikCube<FaceNames, PieceCoverFaceName>;
  abstract createRubikCubeRotationData(): IRubikCubeRotationData<FaceNames, RotationTypes>;
  abstract createRubikCubeRotationHelper(): IRubikCubeRotationHelper<
    FaceNames,
    PieceCoverFaceName,
    RotationTypes
  >;
  abstract createRubikCubeRayCastingData(): IRubikCubeRayCastingData<FaceNames, RotationTypes>;
  abstract createRubikCubeRayCastingHelper(): IRubikCubeRayCastingHelper<FaceNames, RotationTypes>;
}

import type { IRubikCube } from './IRubikCube';
import type { IRubikCubeCreator } from './IRubikCubeCreator';
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
  abstract createRubikCubeCreator(): IRubikCubeCreator<FaceNames, PieceCoverFaceName>;
  abstract createRubikCube(): IRubikCube<FaceNames>;
  abstract createRubikCubeRotationData(): IRubikCubeRotationData<FaceNames, RotationTypes>;
  abstract createRubikCubeRotationHelper(): IRubikCubeRotationHelper<FaceNames, RotationTypes>;
  abstract createRubikCubeRayCastingData(): IRubikCubeRayCastingData<FaceNames, RotationTypes>;
  abstract createRubikCubeRayCastingHelper(): IRubikCubeRayCastingHelper<FaceNames, RotationTypes>;
}

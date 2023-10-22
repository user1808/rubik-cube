import type { IRubikCube } from './IRubikCube';
import type { IRubikCubeData } from './IRubikCubeData';
import type { IRubikCubeMaterials } from './IRubikCubeMaterials';
import type { IRubikCubeRayCastingData } from './IRubikCubeRayCastingData';
import type { IRubikCubeRotationData } from './IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from './IRubikCubeRotationHelper';

export interface IRubikCubeFactory<
  FaceNames extends string,
  PieceCoverFaceName extends string,
  RotationTypes extends string,
> {
  createRubikCubeMaterials(): IRubikCubeMaterials<FaceNames, PieceCoverFaceName>;
  createRubikCubeData(): IRubikCubeData<FaceNames>;
  createRubikCube(): IRubikCube<FaceNames, PieceCoverFaceName>;
  createRubikCubeRotationData(): IRubikCubeRotationData<FaceNames, RotationTypes>;
  createRubikCubeRotationHelper(): IRubikCubeRotationHelper<
    FaceNames,
    PieceCoverFaceName,
    RotationTypes
  >;
  createRubikCubeRayCastingData(): IRubikCubeRayCastingData<FaceNames, RotationTypes>;
}
import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { IRubikCubeRayCastingData } from '../../interfaces/IRubikCubeRayCastingData';
import type { IRubikCubeRayCastingHelper } from '../../interfaces/IRubikCubeRayCastingHelper';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from '../../interfaces/IRubikCubeRotationHelper';
import { IRubikCubeFactory } from '../../interfaces/IRubikCubeFactory';

export class RubikCube2x2Factory extends IRubikCubeFactory<'', '', ''> {
  createRubikCubeMaterials(): IRubikCubeMaterials<'', ''> {
    throw new Error('Method not implemented.');
  }
  createRubikCubeData(): IRubikCubeData<''> {
    throw new Error('Method not implemented.');
  }
  createRubikCube(): IRubikCube<'', ''> {
    throw new Error('Method not implemented.');
  }
  createRubikCubeRotationData(): IRubikCubeRotationData<'', ''> {
    throw new Error('Method not implemented.');
  }
  createRubikCubeRotationHelper(): IRubikCubeRotationHelper<'', '', ''> {
    throw new Error('Method not implemented.');
  }
  createRubikCubeRayCastingData(): IRubikCubeRayCastingData<'', ''> {
    throw new Error('Method not implemented.');
  }
  createRubikCubeRayCastingHelper(): IRubikCubeRayCastingHelper<'', ''> {
    throw new Error('Method not implemented.');
  }
}

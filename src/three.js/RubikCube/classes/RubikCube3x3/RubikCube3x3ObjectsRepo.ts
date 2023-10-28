import type { RubikCube3x3 } from './RubikCube3x3';
import type { RubikCube3x3Data } from './RubikCube3x3Data';
import type { RubikCube3x3Materials } from './RubikCube3x3Materials';
import type { RubikCube3x3RayCastingData } from './RubikCube3x3RayCastingData';
import type { RubikCube3x3RayCastingHelper } from './RubikCube3x3RayCastingHelper';
import type { RubikCube3x3RotationData } from './RubikCube3x3RotationData';
import type { RubikCube3x3RotationHelper } from './RubikCube3x3RotationHelper';

export class RubikCube3x3ObjectsRepo {
  private readonly _rubikCube3x3Objects: {
    cube?: RubikCube3x3;
    data?: RubikCube3x3Data;
    materials?: RubikCube3x3Materials;
    rayCastingData?: RubikCube3x3RayCastingData;
    rayCastingHelper?: RubikCube3x3RayCastingHelper;
    rotationData?: RubikCube3x3RotationData;
    rotationHelper?: RubikCube3x3RotationHelper;
  } = {};

  public get rubikCube3x3Objects() {
    return this._rubikCube3x3Objects;
  }
}

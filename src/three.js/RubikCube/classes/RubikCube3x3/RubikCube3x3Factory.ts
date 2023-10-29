import type { IRubikCube } from '../../interfaces/IRubikCube';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { IRubikCubeRotationHelper } from '../../interfaces/IRubikCubeRotationHelper';
import type { TRubikCube3x3FaceNames } from '../../types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3PieceCoverName } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoverName';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import { IRubikCubeFactory } from '../../interfaces/IRubikCubeFactory';
import { RubikCube3x3Data } from './RubikCube3x3Data';
import { RubikCube3x3RotationData } from './RubikCube3x3RotationData';
import { RubikCube3x3RotationHelper } from './RubikCube3x3RotationHelper';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import { RubikCube3x3Materials } from './RubikCube3x3Materials';
import type { IRubikCubeRayCastingData } from '../../interfaces/IRubikCubeRayCastingData';
import { RubikCube3x3RayCastingData } from './RubikCube3x3RayCastingData';
import type { IRubikCubeRayCastingHelper } from '../../interfaces/IRubikCubeRayCastingHelper';
import { RubikCube3x3RayCastingHelper } from './RubikCube3x3RayCastingHelper';
import type { IRubikCubeCreator } from '../../interfaces/IRubikCubeCreator';
import { RubikCube3x3Creator } from './RubikCube3x3Creator';

export class RubikCube3x3Factory extends IRubikCubeFactory<
  TRubikCube3x3FaceNames,
  TRubikCube3x3PieceCoverName,
  TRubikCube3x3RotationTypes
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TRubikCube3x3FaceNames,
    TRubikCube3x3PieceCoverName
  > {
    return new RubikCube3x3Materials();
  }

  public createRubikCubeData(): IRubikCubeData<TRubikCube3x3FaceNames> {
    return new RubikCube3x3Data();
  }

  public createRubikCubeCreator(): IRubikCubeCreator<
    TRubikCube3x3FaceNames,
    TRubikCube3x3PieceCoverName
  > {
    return new RubikCube3x3Creator();
  }

  public createRubikCube(): IRubikCube<TRubikCube3x3FaceNames> {
    const rubikCubeCreator = this.createRubikCubeCreator();
    const materials = this.createRubikCubeMaterials();
    const cubeData = this.createRubikCubeData();

    return rubikCubeCreator.createRubikCube(this.originalPiece, materials, cubeData);
  }

  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    return new RubikCube3x3RotationData();
  }

  public createRubikCubeRotationHelper(): IRubikCubeRotationHelper<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    const rotationData = this.createRubikCubeRotationData();
    const cubeData = this.createRubikCubeData();
    return new RubikCube3x3RotationHelper(rotationData, cubeData);
  }

  public createRubikCubeRayCastingData(): IRubikCubeRayCastingData<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    return new RubikCube3x3RayCastingData();
  }

  public createRubikCubeRayCastingHelper(): IRubikCubeRayCastingHelper<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > {
    const rayCastingData = this.createRubikCubeRayCastingData();
    return new RubikCube3x3RayCastingHelper(rayCastingData);
  }
}

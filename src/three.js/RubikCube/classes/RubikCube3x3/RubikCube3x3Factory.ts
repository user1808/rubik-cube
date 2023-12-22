import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { TRubikCube3x3PieceCoversNames } from '../../types/RubikCube3x3/TRubikCube3x3PieceCoversNames';
import type { TRubikCube3x3RotationTypes } from '../../types/RubikCube3x3/TRubikCube3x3RotationTypes';
import { RubikCube3x3Data } from './RubikCube3x3Data';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import { RubikCube3x3Materials } from './RubikCube3x3Materials';
import { type TRubikCube3x3RealFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import { type TRubikCube3x3PseudoFacesNames } from '../../types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import { AbstractRubikCubeFactory } from '../AbstractRubikCube/AbstractRubikCubeFactory';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import { RubikCube3x3RotationData } from './RubikCube3x3RotationData';

export class RubikCube3x3Factory extends AbstractRubikCubeFactory<
  TRubikCube3x3RealFacesNames,
  TRubikCube3x3PseudoFacesNames,
  TRubikCube3x3PieceCoversNames,
  TRubikCube3x3RotationTypes
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TRubikCube3x3RealFacesNames,
    TRubikCube3x3PieceCoversNames
  > {
    return new RubikCube3x3Materials();
  }
  public createRubikCubeData(): IRubikCubeData<
    TRubikCube3x3RealFacesNames,
    TRubikCube3x3PseudoFacesNames
  > {
    return new RubikCube3x3Data();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TRubikCube3x3RealFacesNames | TRubikCube3x3PseudoFacesNames,
    TRubikCube3x3RotationTypes
  > {
    return new RubikCube3x3RotationData();
  }
}

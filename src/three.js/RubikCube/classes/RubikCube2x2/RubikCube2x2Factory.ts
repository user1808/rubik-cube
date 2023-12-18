import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import type { TRubikCube2x2PieceCoversNames } from '../../types/RubikCube2x2/TRubikCube2x2PieceCoversNames';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import type { TRubikCube2x2RotationTypes } from '../../types/RubikCube2x2/TRubikCube2x2RotationTypes';
import { AbstractRubikCubeFactory } from '../AbstractRubikCube/AbstractRubikCubeFactory';
import { RubikCube2x2Data } from './RubikCube2x2Data';
import { RubikCube2x2Materials } from './RubikCube2x2Materials';
import { RubikCube2x2RotationData } from './RubikCube2x2RotationData';

export class RubikCube2x2Factory extends AbstractRubikCubeFactory<
  TRubikCube2x2RealFacesNames,
  TRubikCube2x2PseudoFacesNames,
  TRubikCube2x2PieceCoversNames,
  TRubikCube2x2RotationTypes
> {
  public createRubikCubeMaterials(): IRubikCubeMaterials<
    TRubikCube2x2RealFacesNames,
    TRubikCube2x2PieceCoversNames
  > {
    return new RubikCube2x2Materials();
  }
  public createRubikCubeData(): IRubikCubeData<TRubikCube2x2RealFacesNames, never> {
    return new RubikCube2x2Data();
  }
  public createRubikCubeRotationData(): IRubikCubeRotationData<
    TRubikCube2x2RealFacesNames,
    TRubikCube2x2PseudoFacesNames,
    TRubikCube2x2RotationTypes
  > {
    return new RubikCube2x2RotationData();
  }
}

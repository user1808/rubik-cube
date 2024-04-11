import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubePieceMaterials } from '../../interfaces/IRubikCubePiecesMaterials';
import type { TRubikCube2x2PieceCoversNames } from '../../types/RubikCube2x2/TRubikCube2x2PieceCoversNames';
import type { TRubikCube2x2PseudoFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import type { TRubikCube2x2RealFacesNames } from '../../types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import { RubikCubeFactory } from '../RubikCube/RubikCubeHelpers/RubikCubeFactory';
import { RubikCube2x2Data } from './RubikCube2x2Data';
import { RubikCube2x2Materials } from './RubikCube2x2Materials';

export class RubikCube2x2Factory extends RubikCubeFactory<
  TRubikCube2x2RealFacesNames,
  TRubikCube2x2PseudoFacesNames,
  TRubikCube2x2PieceCoversNames
> {
  public createRubikCubeMaterials(): IRubikCubePieceMaterials<
    TRubikCube2x2RealFacesNames,
    TRubikCube2x2PieceCoversNames
  > {
    return new RubikCube2x2Materials();
  }
  public createRubikCubeData(): IRubikCubeData<
    TRubikCube2x2RealFacesNames | TRubikCube2x2PseudoFacesNames
  > {
    return new RubikCube2x2Data();
  }
}

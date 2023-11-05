import * as THREE from 'three';
import type { IRubikCubeRayCastingData } from './IRubikCubeRayCastingData';
import type { TRubikCube3x3RealFacesNames } from '../RubikCube/types/RubikCube3x3/TRubikCube3x3RealFacesNames';

export class RubikCube3x3RayCastingData
  implements IRubikCubeRayCastingData<TRubikCube3x3RealFacesNames> {}

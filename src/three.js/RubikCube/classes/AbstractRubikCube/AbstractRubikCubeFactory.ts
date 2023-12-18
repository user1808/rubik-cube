import { RubikCubeBuilder } from '../RubikCube/RubikCubeBuilder';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { RubikCube } from '../RubikCube/RubikCube';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';
import { RubikCubeRotationHelper } from '../RubikCube/RubikCubeRotationHelper';

export abstract class AbstractRubikCubeFactory<
  RealFacesNames extends string = string,
  PseudoFacesNames extends string | never = string | never,
  PieceCoverFacesNames extends string = string,
  RotationTypes extends string = string,
> {
  constructor(
    public readonly _realFacesNamesArray: Readonly<Array<RealFacesNames>>,
    public readonly _pseudoFacesNamesArray: Readonly<Array<PseudoFacesNames>>,
    public readonly _rotationTypesArray: Readonly<Array<RotationTypes>>,
  ) {}

  abstract createRubikCubeMaterials(): IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>;
  abstract createRubikCubeData(): IRubikCubeData<RealFacesNames, PseudoFacesNames>;
  abstract createRubikCubeRotationData(): IRubikCubeRotationData<
    RealFacesNames,
    PseudoFacesNames,
    RotationTypes
  >;

  public createRubikCubeBuilder(): RubikCubeBuilder<
    RealFacesNames,
    PseudoFacesNames,
    PieceCoverFacesNames,
    RotationTypes
  > {
    return new RubikCubeBuilder(this._realFacesNamesArray, this._pseudoFacesNamesArray);
  }
  public createRubikCubeRotationHelper(): RubikCubeRotationHelper<
    RealFacesNames,
    PseudoFacesNames,
    RotationTypes
  > {
    const rotationData = this.createRubikCubeRotationData();
    return new RubikCubeRotationHelper(rotationData);
  }
  public createRubikCube(
    originalPiece: THREE.Group,
    scene: THREE.Scene,
  ): RubikCube<RealFacesNames, PseudoFacesNames, RotationTypes> {
    const rubikCubeBuilder = this.createRubikCubeBuilder();
    const materials = this.createRubikCubeMaterials();
    const cubeData = this.createRubikCubeData();
    const rotationHelper = this.createRubikCubeRotationHelper();

    return rubikCubeBuilder.buildRubikCube(
      originalPiece,
      materials,
      cubeData,
      rotationHelper,
      scene,
    );
  }
}

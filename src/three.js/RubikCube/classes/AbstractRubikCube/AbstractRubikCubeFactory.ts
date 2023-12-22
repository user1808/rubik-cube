import { RubikCubeBuilder } from '../RubikCube/RubikCubeBuilder';
import type { IRubikCubeData } from '../../interfaces/IRubikCubeData';
import type { IRubikCubeMaterials } from '../../interfaces/IRubikCubeMaterials';
import type { RubikCube } from '../RubikCube/RubikCube';
import type { IRubikCubeRotationData } from '../../interfaces/IRubikCubeRotationData';

export abstract class AbstractRubikCubeFactory<
  RealFacesNames extends string = string,
  PseudoFacesNames extends string | never = string | never,
  PieceCoverFacesNames extends string = string,
  RotationTypes extends string = string,
> {
  constructor(
    public readonly allFacesNamesArray: Readonly<Array<RealFacesNames | PseudoFacesNames>>,
    public readonly rotationTypesArray: Readonly<Array<RotationTypes>>,
  ) {}

  abstract createRubikCubeMaterials(): IRubikCubeMaterials<RealFacesNames, PieceCoverFacesNames>;
  abstract createRubikCubeData(): IRubikCubeData<RealFacesNames, PseudoFacesNames>;
  abstract createRubikCubeRotationData(): IRubikCubeRotationData<
    RealFacesNames | PseudoFacesNames,
    RotationTypes
  >;

  public createRubikCubeBuilder(): RubikCubeBuilder<
    RealFacesNames,
    PseudoFacesNames,
    PieceCoverFacesNames,
    RotationTypes
  > {
    return new RubikCubeBuilder(this.allFacesNamesArray);
  }

  public createRubikCube(
    originalPiece: THREE.Group,
    scene: THREE.Scene,
  ): RubikCube<RealFacesNames | PseudoFacesNames, RotationTypes> {
    const rubikCubeBuilder = this.createRubikCubeBuilder();
    const materials = this.createRubikCubeMaterials();
    const cubeData = this.createRubikCubeData();
    const rotationData = this.createRubikCubeRotationData();

    return rubikCubeBuilder.buildRubikCube(scene, originalPiece, materials, cubeData, rotationData);
  }
}

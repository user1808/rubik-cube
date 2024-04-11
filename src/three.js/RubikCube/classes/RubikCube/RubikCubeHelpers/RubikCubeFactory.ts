import { RubikCubeBuilder } from './RubikCubeBuilder';
import type { IRubikCubeData } from '../../../interfaces/IRubikCubeData';
import type { IRubikCubePieceMaterials } from '../../../interfaces/IRubikCubePiecesMaterials';
import type { RubikCube } from '../RubikCubeStructure/RubikCube';

export abstract class RubikCubeFactory<
  RealFacesNames extends string = string,
  PseudoFacesNames extends string | never = string | never,
  EdgeFacesNames extends string = string,
  RotationTypes extends string = string,
> {
  abstract createRubikCubeMaterials(): IRubikCubePieceMaterials<RealFacesNames, EdgeFacesNames>;
  abstract createRubikCubeData(): IRubikCubeData<RealFacesNames | PseudoFacesNames>;

  public createRubikCubeBuilder(): RubikCubeBuilder<
    RealFacesNames,
    PseudoFacesNames,
    EdgeFacesNames
  > {
    return new RubikCubeBuilder();
  }

  public createRubikCube(
    originalPiece: THREE.Group,
    scene: THREE.Scene,
  ): RubikCube<RealFacesNames | PseudoFacesNames, RotationTypes> {
    const rubikCubeBuilder = this.createRubikCubeBuilder();
    const materials = this.createRubikCubeMaterials();
    const cubeData = this.createRubikCubeData();

    return rubikCubeBuilder.buildRubikCube(scene, originalPiece, materials, cubeData);
  }
}

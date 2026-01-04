import type { TCubeCommonNames } from '../types/cube-common-name';
import type { TRotationSource } from '../types/rubik-cube';
import type { IRubikCube } from './structure';

export interface IRubikCubeRotationImplementation<
  TCubeCommonName extends TCubeCommonNames,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> {
  rotateRubikCubeGroup(
    rubikCube: IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    source: TRotationSource,
  ): Promise<void>;
}

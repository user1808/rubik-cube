import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TRotationTypeData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { Radians } from '@/utils/radians';

export abstract class AbstractRubikHexahedronRotationData<THexahedronRotationGroups extends string>
  implements IRubikCubeRotationData<THexahedronRotationGroups, THexahedronRotationTypes>
{
  public abstract readonly rotationGroupsNormalVectors: Record<
    THexahedronRotationGroups,
    THREE.Vector3
  >;
  public abstract readonly rotationGroupsNewIdxs: Record<
    THexahedronRotationTypes,
    Record<THexahedronRotationGroups, Array<number>>
  >;

  public readonly rotationTypesData: Record<THexahedronRotationTypes, TRotationTypeData> = {
    Clockwise: {
      angle: -Radians['90deg'],
    },
    CounterClockwise: {
      angle: Radians['90deg'],
    },
    Double: {
      angle: Radians['180deg'],
    },
  };
}

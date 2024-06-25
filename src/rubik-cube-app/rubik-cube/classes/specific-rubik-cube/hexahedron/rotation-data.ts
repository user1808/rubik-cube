import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TRotationTypeData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { Radians } from '@/utils/radians';

export abstract class AbstractRubikHexahedronRotationData<THexahedronRotationGroups extends string>
  implements IRubikCubeRotationData<THexahedronRotationGroups, THexahedronRotationTypes>
{
  private readonly _rotationTypesData: typeof this.rotationTypesData = {
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
  public get rotationTypesData(): Record<THexahedronRotationTypes, TRotationTypeData> {
    return this._rotationTypesData;
  }
  public abstract get rotationGroupsNormalVectors(): Record<
    THexahedronRotationGroups,
    THREE.Vector3
  >;
  public abstract get rotationGroupsNewIdxs(): Record<
    THexahedronRotationTypes,
    Record<THexahedronRotationGroups, Array<number>>
  >;
}

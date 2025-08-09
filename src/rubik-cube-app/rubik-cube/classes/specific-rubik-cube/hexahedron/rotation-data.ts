import type { Vector3 } from 'three';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { Radians } from '@/utils/radians';

export abstract class AbstractRubikHexahedronRotationData<THexahedronRotationGroups extends string>
  implements IRubikCubeRotationData<THexahedronRotationGroups, THexahedronRotationTypes>
{
  public abstract readonly rotationGroupsNormalVectors: Record<THexahedronRotationGroups, Vector3>;
  public abstract readonly rotationPiecesChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedronRotationGroups, Array<number>>
  >;
  public abstract readonly rotationGroupsNotation: Record<THexahedronRotationGroups, string>;
  public abstract readonly rotationTypesNotation: Record<THexahedronRotationTypes, string>;

  public readonly rotationAngles: Record<THexahedronRotationTypes, number> = {
    Clockwise: -Radians['90deg'],
    CounterClockwise: Radians['90deg'],
  };
  public readonly contraryRotationTypes: Record<
    THexahedronRotationTypes,
    THexahedronRotationTypes
  > = {
    Clockwise: 'CounterClockwise',
    CounterClockwise: 'Clockwise',
  };
}

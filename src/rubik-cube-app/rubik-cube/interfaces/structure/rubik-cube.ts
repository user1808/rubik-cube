import * as THREE from 'three';
import type { IRubikCubePieceWrapper } from './rubik-cube-piece-wrapper';
import type { IRubikCubeRotationImplementation } from '../rubik-cube-rotation-implementation';
import type { IRubikCubeRotationData } from '../data';
import type { IRubikCubeShell } from './rubik-cube-shell';

export type TUniversalRubikCube = IRubikCube<string, string, string>;

export interface IRubikCube<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> extends THREE.Group {
  readonly scene: THREE.Scene;

  readonly shell: IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  readonly pieces: Array<IRubikCubePieceWrapper>;
  readonly rotationGroups: Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>;

  readonly rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;
  readonly rotationImplementation: IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  get rotationPending(): boolean;

  rotate(rotationGroup: TCubeRotationGroups, rotationType: TCubeRotationTypes): Promise<void>;

  addToScene(): void;
  removeFromScene(): void;
}

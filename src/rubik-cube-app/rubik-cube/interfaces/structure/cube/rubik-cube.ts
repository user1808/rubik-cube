import * as THREE from 'three';
import type { IRubikCubeShell } from '../shell/rubik-cube-shell';
import type { TCubePieces, TRotationGroups } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCube<
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellPieces extends string = string,
> extends THREE.Group {
  readonly scene: THREE.Scene;

  readonly shell: IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  readonly pieces: TCubePieces;
  readonly rotationGroups: TRotationGroups<TCubeRotationGroups>;

  rotate(rotationGroup: TCubeRotationGroups, rotationType: TCubeRotationTypes): Promise<void>;

  addToScene(): void;
  removeFromScene(): void;
}

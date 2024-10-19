import * as THREE from 'three';
import type { IRubikCubeShell } from '../shell/rubik-cube-shell';
import type { TCubePieces, TRotationGroups } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeRotationRaycaster } from '../../rubik-cube-rotation-raycaster';

export interface IRubikCube<
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellPieces extends string = string,
> extends THREE.Group {
  isOnScene: boolean;

  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;

  readonly shell: IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  readonly pieces: TCubePieces;
  readonly rotationGroups: TRotationGroups<TCubeRotationGroups>;

  setRotationRaycaster(raycaster: IRubikCubeRotationRaycaster): void;
  rotate(rotationGroup: TCubeRotationGroups, rotationType: TCubeRotationTypes): Promise<void>;

  addToScene(): void;
  removeFromScene(): void;
}

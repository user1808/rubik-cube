import type { Scene, PerspectiveCamera } from 'three';
import { Group } from 'three';
import type { IRubikCubeShell } from '../shell/rubik-cube-shell';
import type { IRubikCubeRotationRaycaster } from '../../rubik-cube-rotation-raycaster';
import type {
  TCubeFaces,
  TCubePieces,
  TRotationGroups,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeFacesTexts } from '../helpers/rubik-cube-faces-texts';

export interface IRubikCube<
  TCubeFacesNames extends string = string,
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellFilenames extends string = string,
> extends Group {
  isOnScene: boolean;

  readonly scene: Scene;
  readonly camera: PerspectiveCamera;

  readonly shell: IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>;
  readonly pieces: TCubePieces<TCubeFacesNames>;
  readonly faces: TCubeFaces<TCubeFacesNames>;
  readonly rotationGroups: TRotationGroups<TCubeFacesNames, TCubeRotationGroups>;
  readonly facesTexts: IRubikCubeFacesTexts;

  setRotationRaycaster(raycaster: IRubikCubeRotationRaycaster): void;
  rotate(rotationGroup: TCubeRotationGroups, rotationType: TCubeRotationTypes): Promise<void>;

  addToScene(): void;
  removeFromScene(): void;
}

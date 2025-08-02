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
import type { IRubikCubeMaterials } from '../../data';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { IRubikCubeColorRaycaster } from '../../rubik-cube-color-raycaster';

export interface IRubikCubeProperties<
  TCubeCommonName extends TCubeCommonNames = TCubeCommonNames,
  TCubeFacesNames extends string = string,
  TCubeEdgeFacesNames extends string = string,
  TCubeRotationTypes extends string = string,
> {
  readonly commonName: TCubeCommonName;
  readonly cameraMinDistance: number;
  readonly facesNames: Readonly<Array<TCubeFacesNames>>;
  readonly rotationTypesNames: Readonly<Array<TCubeRotationTypes>>;
  readonly piecesMaterials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>;
}

export interface IRubikCube<
  TCubeCommonName extends TCubeCommonNames = TCubeCommonNames,
  TCubeFacesNames extends string = string,
  TCubeEdgeFacesNames extends string = string,
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellFilenames extends string = string,
> extends Group {
  readonly properties: IRubikCubeProperties<
    TCubeCommonName,
    TCubeFacesNames,
    TCubeEdgeFacesNames,
    TCubeRotationTypes
  >;

  isOnScene: boolean;

  readonly scene: Scene;
  readonly camera: PerspectiveCamera;

  readonly shell: IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>;
  readonly pieces: TCubePieces<TCubeFacesNames>;
  readonly faces: TCubeFaces<TCubeFacesNames>;
  readonly rotationGroups: TRotationGroups<TCubeFacesNames, TCubeRotationGroups>;
  readonly facesTexts: IRubikCubeFacesTexts;

  setRotationRaycaster(raycaster: IRubikCubeRotationRaycaster): void;
  setColorRaycaster(raycaster: IRubikCubeColorRaycaster): void;
  rotate(rotationGroup: TCubeRotationGroups, rotationType: TCubeRotationTypes): Promise<void>;

  addToScene(): void;
  removeFromScene(): void;

  updateLogicalFaces(): void;
}

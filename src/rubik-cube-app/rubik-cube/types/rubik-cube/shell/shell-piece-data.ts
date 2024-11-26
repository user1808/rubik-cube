import * as THREE from 'three';
import type { TShellRotationData } from './shell-rotation-data';

export type TShellPieceDataInitRotation = {
  rotation: THREE.Euler;
  axes?: Partial<Record<'x' | 'y' | 'z', THREE.Vector3>>;
};

export type TShellPieceData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
> = {
  filename: TCubeShellFilename;
  initPosition: THREE.Vector3;
  initRotation: TShellPieceDataInitRotation;
  rotations: Array<TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>>;
};

import type { Euler, Vector3 } from 'three';
import type { TShellRotationData } from './shell-rotation-data';

export type TShellPieceDataInitRotation = {
  rotation: Euler;
  axes?: Partial<Record<'x' | 'y' | 'z', Vector3>>;
};

export type TShellPieceData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
> = {
  filename: TCubeShellFilename;
  initPosition: Vector3;
  initRotation: TShellPieceDataInitRotation;
  rotations: Array<TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>>;
};

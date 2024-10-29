import type { TTetrahedronFaces } from '.';

type TTetrahedronCorners = 'RightCorner' | 'LeftCorner' | 'BackCorner' | 'UpCorner';
type TTetrahedronMidLayers = 'RightMidLayer' | 'LeftMidLayer' | 'BackMidLayer' | 'UpMidLayer';

export type TTetrahedronRotationGroups =
  | TTetrahedronFaces
  | TTetrahedronCorners
  | TTetrahedronMidLayers;

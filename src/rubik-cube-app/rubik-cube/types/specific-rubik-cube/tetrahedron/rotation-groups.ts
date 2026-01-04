import { TetrahedronFaces } from './cube-faces';

const TetrahedronCorners = ['RightCorner', 'LeftCorner', 'BackCorner', 'UpCorner'] as const;
const TetrahedronMidLayers = [
  'RightMidLayer',
  'LeftMidLayer',
  'BackMidLayer',
  'UpMidLayer',
] as const;

export const TetrahedronRotationGroups = [
  ...TetrahedronFaces,
  ...TetrahedronCorners,
  ...TetrahedronMidLayers,
] as const;

export type TTetrahedronRotationGroups = (typeof TetrahedronRotationGroups)[number];

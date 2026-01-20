import { beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeProperties } from '@/rubik-cube-app/rubik-cube/interfaces/structure/cube/rubik-cube';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';

export type LogicalValues = Record<string, Array<TCubeFaceColor | null>>;

export const setupPinia = (): void => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
};

export const createCubeProperties = (
  commonName: IRubikCubeProperties['commonName'],
  materials: IRubikCubeMaterials<string, string>,
): IRubikCubeProperties => {
  return {
    commonName,
    cameraMinDistance: 0,
    rotationGroups: [],
    rotationTypesNames: [],
    piecesMaterials: materials,
  } as IRubikCubeProperties;
};

export const setSolvedHexahedronState = (
  size: number,
  faceColors: Record<THexahedronFaces, TCubeFaceColor>,
): LogicalValues => {
  const logicalValues: LogicalValues = {};
  for (const face of Object.keys(faceColors) as THexahedronFaces[]) {
    logicalValues[face] = Array.from({ length: size * size }, () => faceColors[face]);
  }
  return logicalValues;
};

export const setSolvedTetrahedronState = (
  faceColors: Record<TTetrahedronFaces, TCubeFaceColor>,
): LogicalValues => {
  const logicalValues: LogicalValues = {};
  for (const face of Object.keys(faceColors) as TTetrahedronFaces[]) {
    logicalValues[face] = Array.from({ length: 9 }, () => faceColors[face]);
  }
  return logicalValues;
};

export const setSolvedDodecahedronState = (
  faceColors: Record<TDodecahedronFaces, TCubeFaceColor>,
): LogicalValues => {
  const logicalValues: LogicalValues = {};
  for (const face of Object.keys(faceColors) as TDodecahedronFaces[]) {
    logicalValues[face] = Array.from({ length: 11 }, () => faceColors[face]);
  }
  return logicalValues;
};

export const swapStickers = (
  logicalValues: LogicalValues,
  a: { face: string; position: number },
  b: { face: string; position: number },
): void => {
  const temp = logicalValues[a.face][a.position];
  logicalValues[a.face][a.position] = logicalValues[b.face][b.position];
  logicalValues[b.face][b.position] = temp;
};

export const cycleStickers = (
  logicalValues: LogicalValues,
  positions: Array<{ face: string; position: number }>,
): void => {
  if (positions.length < 2) return;
  const last =
    logicalValues[positions[positions.length - 1].face][positions[positions.length - 1].position];
  for (let i = positions.length - 1; i > 0; i--) {
    const prev = positions[i - 1];
    const curr = positions[i];
    logicalValues[curr.face][curr.position] = logicalValues[prev.face][prev.position];
  }
  const first = positions[0];
  logicalValues[first.face][first.position] = last;
};

export const setupStores = (
  commonName: IRubikCubeProperties['commonName'],
  logicalValues: LogicalValues,
): void => {
  const facesStore = useFacesLogicalValuesStore();
  facesStore.setFacesLogicalValues(commonName, logicalValues);
};

export const setSelectedCube = (
  commonName: IRubikCubeProperties['commonName'],
  materials: IRubikCubeMaterials<string, string>,
): void => {
  const selected = useSelectedCubeStore();
  selected.setCurrentCubeProperties(createCubeProperties(commonName, materials));
};

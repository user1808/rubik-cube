import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { RubikHexahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/materials';
import { is4x4x4CubeSolvable } from '@/composables/algorithms/solvability/is-4x4x4-cube-solvable';
import {
  cycleStickers,
  setSelectedCube,
  setSolvedHexahedronState,
  setupPinia,
  setupStores,
} from './solvability-test-utils';

setupPinia();

describe('is4x4x4CubeSolvable', () => {
  it('returns true for solved state and false for invalid color count', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('4x4x4 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(4, faceColors);
    setupStores('4x4x4 Cube', logicalValues);
    expect(is4x4x4CubeSolvable()).toBe(true);

    logicalValues.Up[0] = faceColors.Down;
    setupStores('4x4x4 Cube', logicalValues);
    expect(is4x4x4CubeSolvable()).toBe(false);
  });

  it('returns false for single corner twist', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('4x4x4 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(4, faceColors);

    cycleStickers(logicalValues, [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 3 },
    ]);
    setupStores('4x4x4 Cube', logicalValues);
    expect(is4x4x4CubeSolvable()).toBe(false);
  });
});

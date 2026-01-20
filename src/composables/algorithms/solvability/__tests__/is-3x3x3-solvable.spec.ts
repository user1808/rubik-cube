import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { RubikHexahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/materials';
import { is3x3x3CubeSolvable } from '@/composables/algorithms/solvability/is-3x3x3-cube-solvable';
import {
  setSelectedCube,
  setSolvedHexahedronState,
  setupPinia,
  setupStores,
  swapStickers,
} from './solvability-test-utils';

setupPinia();

describe('is3x3x3CubeSolvable', () => {
  it('returns true for solved state and false for single edge flip', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('3x3x3 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(3, faceColors);
    setupStores('3x3x3 Cube', logicalValues);
    expect(is3x3x3CubeSolvable()).toBe(true);

    swapStickers(logicalValues, { face: 'Up', position: 7 }, { face: 'Front', position: 1 });
    setupStores('3x3x3 Cube', logicalValues);
    expect(is3x3x3CubeSolvable()).toBe(false);
  });

  it('returns false for odd edge permutation', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('3x3x3 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(3, faceColors);

    swapStickers(logicalValues, { face: 'Up', position: 1 }, { face: 'Up', position: 7 });
    swapStickers(logicalValues, { face: 'Back', position: 1 }, { face: 'Front', position: 1 });
    setupStores('3x3x3 Cube', logicalValues);
    expect(is3x3x3CubeSolvable()).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { RubikHexahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/materials';
import { is5x5x5CubeSolvable } from '@/composables/algorithms/solvability/is-5x5x5-cube-solvable';
import {
  setSelectedCube,
  setSolvedHexahedronState,
  setupPinia,
  setupStores,
  swapStickers,
} from './solvability-test-utils';

setupPinia();

describe('is5x5x5CubeSolvable', () => {
  it('returns true for solved state and false for single middle-edge flip', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('5x5x5 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(5, faceColors);
    setupStores('5x5x5 Cube', logicalValues);
    expect(is5x5x5CubeSolvable()).toBe(true);

    swapStickers(logicalValues, { face: 'Up', position: 2 }, { face: 'Back', position: 2 });
    setupStores('5x5x5 Cube', logicalValues);
    expect(is5x5x5CubeSolvable()).toBe(false);
  });

  it('returns false for odd middle-edge permutation', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('5x5x5 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(5, faceColors);

    swapStickers(logicalValues, { face: 'Up', position: 2 }, { face: 'Up', position: 10 });
    swapStickers(logicalValues, { face: 'Back', position: 2 }, { face: 'Left', position: 2 });
    setupStores('5x5x5 Cube', logicalValues);
    expect(is5x5x5CubeSolvable()).toBe(false);
  });
});

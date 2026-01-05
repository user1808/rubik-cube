import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { RubikHexahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/materials';
import { is2x2x2CubeSolvable } from '@/composables/algorithms/solvability/is-2x2x2-cube-solvable';
import {
  cycleStickers,
  setSelectedCube,
  setSolvedHexahedronState,
  setupPinia,
  setupStores,
} from './solvability-test-utils';

setupPinia();

describe('is2x2x2CubeSolvable', () => {
  it('returns true for solved state and false for single corner twist', () => {
    const materials = new RubikHexahedronMaterials();
    setSelectedCube('2x2x2 Cube', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<THexahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedHexahedronState(2, faceColors);
    setupStores('2x2x2 Cube', logicalValues);
    expect(is2x2x2CubeSolvable()).toBe(true);

    cycleStickers(logicalValues, [
      { face: 'Up', position: 0 },
      { face: 'Left', position: 0 },
      { face: 'Back', position: 1 },
    ]);
    setupStores('2x2x2 Cube', logicalValues);
    expect(is2x2x2CubeSolvable()).toBe(false);
  });
});

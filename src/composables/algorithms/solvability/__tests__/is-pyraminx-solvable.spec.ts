import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import { RubikTetrahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/materials';
import { isPyraminxSolvable } from '@/composables/algorithms/solvability/is-pyraminx-solvable';
import {
  setSelectedCube,
  setSolvedTetrahedronState,
  setupPinia,
  setupStores,
  swapStickers,
} from './solvability-test-utils';

setupPinia();

describe('isPyraminxSolvable', () => {
  it('returns true for solved state and false for edge flip and edge swap', () => {
    const materials = new RubikTetrahedronMaterials();
    setSelectedCube('Pyraminx', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<TTetrahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedTetrahedronState(faceColors);
    setupStores('Pyraminx', logicalValues);
    expect(isPyraminxSolvable()).toBe(true);

    swapStickers(logicalValues, { face: 'Front', position: 8 }, { face: 'Left', position: 2 });
    setupStores('Pyraminx', logicalValues);
    expect(isPyraminxSolvable()).toBe(false);

    const resetValues = setSolvedTetrahedronState(faceColors);
    setupStores('Pyraminx', resetValues);
    swapStickers(resetValues, { face: 'Front', position: 8 }, { face: 'Front', position: 2 });
    swapStickers(resetValues, { face: 'Left', position: 2 }, { face: 'Right', position: 8 });
    setupStores('Pyraminx', resetValues);
    expect(isPyraminxSolvable()).toBe(false);
  });

  it('returns false when tips do not match their positions', () => {
    const materials = new RubikTetrahedronMaterials();
    setSelectedCube('Pyraminx', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<TTetrahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedTetrahedronState(faceColors);
    setupStores('Pyraminx', logicalValues);

    swapStickers(logicalValues, { face: 'Front', position: 0 }, { face: 'Front', position: 6 });
    swapStickers(logicalValues, { face: 'Right', position: 0 }, { face: 'Left', position: 3 });
    swapStickers(logicalValues, { face: 'Left', position: 0 }, { face: 'Down', position: 0 });
    setupStores('Pyraminx', logicalValues);
    expect(isPyraminxSolvable()).toBe(false);
  });
});

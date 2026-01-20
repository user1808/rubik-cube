import { describe, expect, it } from 'vitest';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { DodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { RubikDodecahedronMaterials } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/materials';
import { RubikDodecahedronFacesData } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/faces-data';
import { isMegaminxSolvable } from '@/composables/algorithms/solvability/is-megaminx-solvable';
import {
  cycleStickers,
  setSelectedCube,
  setSolvedDodecahedronState,
  setupPinia,
  setupStores,
  swapStickers,
} from './solvability-test-utils';

setupPinia();

describe('isMegaminxSolvable', () => {
  it('returns true for solved state and false for edge flip and corner twist', () => {
    const materials = new RubikDodecahedronMaterials();
    setSelectedCube('Megaminx', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<TDodecahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedDodecahedronState(faceColors);
    setupStores('Megaminx', logicalValues);
    expect(isMegaminxSolvable()).toBe(true);

    const facesData = new RubikDodecahedronFacesData();
    const facePieces = facesData.facesPiecesIdxs;
    const edgePieceId = facePieces.Up[0];
    const edgePositions = DodecahedronFaces.flatMap((face) =>
      facePieces[face]
        .map((pieceIdx, position) => ({ pieceIdx, face, position }))
        .filter((entry) => entry.pieceIdx === edgePieceId),
    );
    swapStickers(
      logicalValues,
      { face: edgePositions[0].face, position: edgePositions[0].position },
      { face: edgePositions[1].face, position: edgePositions[1].position },
    );
    setupStores('Megaminx', logicalValues);
    expect(isMegaminxSolvable()).toBe(false);

    const resetValues = setSolvedDodecahedronState(faceColors);
    setupStores('Megaminx', resetValues);
    const cornerPieceId = facePieces.Up[1];
    const cornerPositions = DodecahedronFaces.flatMap((face) =>
      facePieces[face]
        .map((pieceIdx, position) => ({ pieceIdx, face, position }))
        .filter((entry) => entry.pieceIdx === cornerPieceId),
    );
    cycleStickers(resetValues, cornerPositions);
    setupStores('Megaminx', resetValues);
    expect(isMegaminxSolvable()).toBe(false);
  });

  it('returns false for odd edge permutation', () => {
    const materials = new RubikDodecahedronMaterials();
    setSelectedCube('Megaminx', materials);

    const faceColors = Object.fromEntries(
      Object.entries(materials.cubeFacesMaterials).map(([face, data]) => [face, data.color]),
    ) as Record<TDodecahedronFaces, TCubeFaceColor>;
    const logicalValues = setSolvedDodecahedronState(faceColors);

    const facesData = new RubikDodecahedronFacesData();
    const facePieces = facesData.facesPiecesIdxs;
    const edgePieceA = facePieces.Up[0];
    const edgePieceB = facePieces.Up[1];

    const positionsA = DodecahedronFaces.flatMap((face) =>
      facePieces[face]
        .map((pieceIdx, position) => ({ pieceIdx, face, position }))
        .filter((entry) => entry.pieceIdx === edgePieceA),
    );
    const positionsB = DodecahedronFaces.flatMap((face) =>
      facePieces[face]
        .map((pieceIdx, position) => ({ pieceIdx, face, position }))
        .filter((entry) => entry.pieceIdx === edgePieceB),
    );
    for (let i = 0; i < positionsA.length; i++) {
      swapStickers(
        logicalValues,
        { face: positionsA[i].face, position: positionsA[i].position },
        { face: positionsB[i].face, position: positionsB[i].position },
      );
    }
    setupStores('Megaminx', logicalValues);
    expect(isMegaminxSolvable()).toBe(false);
  });
});

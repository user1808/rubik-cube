<template>
  <div class="mx-auto flex w-full flex-col p-4">
    <Button
      class="w-full"
      :disabled="!canGenerateMoves"
      label="Solve it!"
      @click="generateMovesToSolve"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { storeToRefs } from 'pinia';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TCubeMovesHistoryLog } from '@/rubik-cube-app/rubik-cube/types/cube-moves-history-log';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { solve2x2x2Cube } from '@/composables/algorithms/solve/solve-2x2x2-cube';
import { solve3x3x3Cube } from '@/composables/algorithms/solve/solve-3x3x3-cube';
import { solve4x4x4Cube } from '@/composables/algorithms/solve/solve-4x4x4-cube';
import { solve5x5x5Cube } from '@/composables/algorithms/solve/solve-5x5x5-cube';
import { solveMegaminxCube } from '@/composables/algorithms/solve/solve-megaminx-cube';
import { solvePyraminxCube } from '@/composables/algorithms/solve/solve-pyraminx-cube';

type TFaceLogicalValuesInput = Record<string, Array<TCubeFaceColor | null | undefined>>;
type TSolver = (logicalValuesInput: TFaceLogicalValuesInput) => Array<TCubeMovesHistoryLog>;
type TSolverDefinition = {
  algorithmName: string;
  solve: TSolver;
};

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
const facesLogicalValuesStore = useFacesLogicalValuesStore();
const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);

const currentCubeName = computed<TCubeCommonNames | undefined>(() => {
  return getCurrentCubeProperties.value?.commonName;
});

const solverByCubeName: Record<TCubeCommonNames, TSolverDefinition> = {
  '2x2x2 Cube': {
    algorithmName: 'solve2x2x2Cube',
    solve: solve2x2x2Cube,
  },
  '3x3x3 Cube': {
    algorithmName: 'solve3x3x3Cube',
    solve: solve3x3x3Cube,
  },
  '4x4x4 Cube': {
    algorithmName: 'solve4x4x4Cube',
    solve: solve4x4x4Cube,
  },
  '5x5x5 Cube': {
    algorithmName: 'solve5x5x5Cube',
    solve: solve5x5x5Cube,
  },
  Megaminx: {
    algorithmName: 'solveMegaminxCube',
    solve: solveMegaminxCube,
  },
  Pyraminx: {
    algorithmName: 'solvePyraminxCube',
    solve: solvePyraminxCube,
  },
};

const canGenerateMoves = computed<boolean>(() => {
  if (!currentCubeName.value) return false;
  return !!getFacesLogicalValues.value[currentCubeName.value];
});

const generateMovesToSolve = () => {
  if (!currentCubeName.value) return;

  const logicalValues = getFacesLogicalValues.value[currentCubeName.value];
  if (!logicalValues) return;

  const solver = solverByCubeName[currentCubeName.value];
  const moves = solver.solve(logicalValues);

  console.log(`[${solver.algorithmName}] moves for ${currentCubeName.value}:`, moves);
};
</script>

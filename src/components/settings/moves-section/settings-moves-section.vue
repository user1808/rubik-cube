<template>
  <div class="relative flex max-h-full w-full flex-col px-4 pb-4">
    <SelectButton
      v-model="selectedMovesSectionOption"
      :options="movesSectionOptions"
      :allow-empty="false"
      option-label="optionLabel"
      :pt="{
        root: 'pt-4',
        pcToggleButton: {
          root: 'group basis-1/2 !bg-gray-950 hover:!bg-gray-900 !border-gray-950 hover:!border-gray-900 text-nowrap h-12',
          content: 'relative size-full',
        },
      }"
    />
    <div class="flex items-center justify-center">
      <h1 class="select-none text-nowrap py-4 text-xl tracking-tight text-white">
        {{ selectedMovesSectionOption.label }}
      </h1>
    </div>
    <component :is="selectedMovesSectionOption.component" />
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, ref, type Component } from 'vue';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import SelectButton from 'primevue/selectbutton';
import SettingsMovesHistory from '../moves-history/settings-moves-history.vue';
import SettingsMovesToSolve from '../moves-to-solve/settings-moves-to-solve.vue';

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

const currentCubeName = computed(() => getCurrentCubeProperties.value?.commonName);

type MovesSectionOption = {
  optionLabel: string;
  label: string;
  component: Component;
};

const movesSectionOptions = computed<MovesSectionOption[]>(() => [
  {
    optionLabel: 'Moves History',
    label: `Moves History For ${currentCubeName.value ?? '---'}`,
    component: markRaw(SettingsMovesHistory),
  },
  {
    optionLabel: 'Solve Cube',
    label: `Solve ${currentCubeName.value ?? '---'}`,
    component: markRaw(SettingsMovesToSolve),
  },
]);
const selectedMovesSectionOption = ref<MovesSectionOption>(movesSectionOptions.value[0]);
</script>

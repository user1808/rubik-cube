<template>
  <div
    v-if="rotationTime !== undefined && currentCubeName !== undefined"
    class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4"
  >
    <h1 class="select-none text-xl tracking-tight text-white">Rotation Time</h1>
    <VueSlider
      :model-value="rotationTime"
      tooltip="none"
      :min="MIN_ROTATION_TIME"
      :max="MAX_ROTATION_TIME"
      :interval="INTERVAL_ROTATION_TIME"
      contained
      :marks="marks"
      :process-style="{
        backgroundColor: '#374151',
      }"
      @update:model-value="cubeRotationTimesStore.setCubeRotationTime(currentCubeName, $event)"
    />
    <span class="text-center text-white">{{ rotationTime.toFixed(2) }}s</span>
    <div
      class="flex max-w-fit cursor-pointer items-center gap-x-4 px-1 py-2"
      @click.prevent="cubeRotationTimesStore.toggleIsGlobal(currentCubeName)"
    >
      <Checkbox binary :model-value="getIsGlobal" />
      <span class="select-none text-pretty text-sm leading-4 text-gray-400">
        Apply to every cube
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueSlider, { type Marks } from 'vue-3-slider-component';
import Checkbox from 'primevue/checkbox';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { useCubeRotationTimesStore } from '@/stores/use-cube-rotation-times-store';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const INTERVAL_ROTATION_TIME = 0.01 as const;
const MIN_ROTATION_TIME = 0.05 as const;
const MAX_ROTATION_TIME = 1.5 as const;
const marks = ref<Marks>({
  [MIN_ROTATION_TIME]: {
    label: 'Fast',
    labelStyle: {
      color: '#fff',
      left: 0,
      transform: 'translate(0)',
    },
  },
  [MAX_ROTATION_TIME]: {
    label: 'Slow',
    labelStyle: {
      color: '#fff',
      transform: 'translate(-100%, 0)',
    },
  },
});

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

const cubeRotationTimesStore = useCubeRotationTimesStore();
const { getIsGlobal, getCubeRotationTimes } = storeToRefs(cubeRotationTimesStore);

const currentCubeName = computed<TCubeCommonNames | undefined>(() => {
  return getCurrentCubeProperties.value?.commonName;
});

const rotationTime = computed<number | undefined>(() => {
  if (!currentCubeName.value) return undefined;
  return getCubeRotationTimes.value[currentCubeName.value];
});
</script>

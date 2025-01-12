<template>
  <canvas id="rubik-cube" ref="canvas" class="fixed left-0 top-0" />
  <div
    v-if="isCubeLoading"
    class="fixed left-0 top-0 z-10 flex size-full flex-col items-center justify-center bg-black/80"
  >
    <div class="flex flex-col gap-y-4 text-center">
      <ProgressSpinner class="size-40" stroke-width="6" :pt="{ circle: '!stroke-white' }" />
      <div class="flex justify-center text-xl text-white">
        <span>Loading</span>
        <span class="w-2 animate-first-dot">.</span>
        <span class="w-2 animate-second-dot">.</span>
        <span class="w-2 animate-third-dot">.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import { RubikCubeApp } from '@/rubik-cube-app/rubik-cube-app';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { RubikDodecahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/factory';
import { RubikHexahedron2x2Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/2x2/factory';
import { RubikHexahedron3x3Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/3x3/factory';
import { RubikHexahedron4x4Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/4x4/factory';
import { RubikHexahedron5x5Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/5x5/factory';
import { RubikTetrahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/factory';
import { ProgressSpinner } from 'primevue';

type RubikFactories = {
  [CubeCommonName in TCubeCommonNames]: IRubikCubeFactory<Record<string, string>, CubeCommonName>;
};

const rubikFactories: RubikFactories = {
  '2x2 Cube': new RubikHexahedron2x2Factory(),
  '3x3 Cube': new RubikHexahedron3x3Factory(),
  '4x4 Cube': new RubikHexahedron4x4Factory(),
  '5x5 Cube': new RubikHexahedron5x5Factory(),
  Megaminx: new RubikDodecahedronFactory(),
  Pyraminx: new RubikTetrahedronFactory(),
};

const selectedCubeStore = useSelectedCubeStore();
const { getSelectedCubeData, isCubeLoading } = storeToRefs(selectedCubeStore);

const selectedFactory = computed(() => rubikFactories[getSelectedCubeData.value.name]);

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

onMounted(async () => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  isCubeLoading.value = true;
  await rubikCubeApp.value.start(selectedFactory.value);
  isCubeLoading.value = false;
});
watch(
  () => selectedFactory.value,
  async (newFactory) => {
    isCubeLoading.value = true;
    await rubikCubeApp.value?.changeCube(newFactory);
    isCubeLoading.value = false;
  },
);
</script>

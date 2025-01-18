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
import { ref, onMounted, watch } from 'vue';
import type {
  DefaultRubikCubeFactory,
  IRubikCubeFactory,
} from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import { RubikCubeApp } from '@/rubik-cube-app/rubik-cube-app';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { ProgressSpinner } from 'primevue';

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

type RubikFactories = {
  [CubeCommonName in TCubeCommonNames]: () => Promise<
    IRubikCubeFactory<Record<string, string>, CubeCommonName>
  >;
};

const rubikFactories: RubikFactories = {
  '2x2 Cube': () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/2x2/factory').then(
      (m) => new m.RubikHexahedron2x2Factory(),
    ),
  '3x3 Cube': () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/3x3/factory').then(
      (m) => new m.RubikHexahedron3x3Factory(),
    ),
  '4x4 Cube': () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/4x4/factory').then(
      (m) => new m.RubikHexahedron4x4Factory(),
    ),
  '5x5 Cube': () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/5x5/factory').then(
      (m) => new m.RubikHexahedron5x5Factory(),
    ),
  Megaminx: () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/factory').then(
      (m) => new m.RubikDodecahedronFactory(),
    ),
  Pyraminx: () =>
    import('@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/factory').then(
      (m) => new m.RubikTetrahedronFactory(),
    ),
};
const factoryCache = new Map<TCubeCommonNames, DefaultRubikCubeFactory>();

const getFactory = async (name: TCubeCommonNames): Promise<DefaultRubikCubeFactory> => {
  if (factoryCache.has(name)) {
    return factoryCache.get(name)!;
  }

  const factory = await rubikFactories[name]();
  factoryCache.set(name, factory);
  return factory;
};

const selectedCubeStore = useSelectedCubeStore();
const { getSelectedCubeData } = storeToRefs(selectedCubeStore);

const isCubeLoading = ref(false);
onMounted(async () => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  isCubeLoading.value = true;

  const factory = await getFactory(getSelectedCubeData.value.name);
  await rubikCubeApp.value.start(factory);

  isCubeLoading.value = false;
});
watch(
  () => getSelectedCubeData.value,
  async (newFactory) => {
    isCubeLoading.value = true;

    const factory = await getFactory(newFactory.name);
    await rubikCubeApp.value?.changeCube(factory);

    isCubeLoading.value = false;
  },
);
</script>

<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces';
import { RubikCubeApp } from '@/rubik-cube-app/rubik-cube-app';

const props = defineProps<{
  factory: IRubikCubeFactory<Record<string, string>>;
}>();

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

onMounted(() => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  rubikCubeApp.value.start(props.factory);
});
watch(
  () => props.factory,
  (newFactory) => rubikCubeApp.value?.changeCube(newFactory),
);
</script>

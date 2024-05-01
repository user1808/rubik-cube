<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RubikCubeApp } from '@/three.js/rubik-cube-app';
import { RubikCube2x2Data } from '@/three.js/rubik-cube/classes/cube-2x2/cube-data';

const props = defineProps<{
  filename: string;
}>();

const restart = () => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  app.start(props.filename, new RubikCube2x2Data());
};

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

onMounted(restart);
watch(() => props.filename, restart);
</script>

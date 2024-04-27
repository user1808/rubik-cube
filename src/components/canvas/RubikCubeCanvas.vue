<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RubikCubeApp } from '@/three.js/RubikCubeApp';

const props = defineProps<{
  filename: string;
}>();

const restart = () => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  app.start(props.filename);
};

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

onMounted(restart);
watch(() => props.filename, restart);
</script>

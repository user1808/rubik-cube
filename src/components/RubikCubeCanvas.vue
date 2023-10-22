<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RubikCubeApp } from '@/three.js/RubikCubeApp';
import { CustomGLTFLoader } from '@/three.js/Common/Custom';

const canvas = ref<HTMLCanvasElement | null>(null);
const gltfLoader: CustomGLTFLoader = new CustomGLTFLoader();

onMounted(() => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  gltfLoader.load('RubikCubePiece.glb', (data) => {
    app.start(data.scene);
  });
});
</script>

<style scoped lang="scss">
canvas#rubik-cube {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>

<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RubikCubeApp } from '@/three.js/RubikCubeApp';
import { CustomGLTFLoader } from '@/three.js/Common/Custom';
import type { RubikCubeFactory } from '@/three.js/RubikCube/classes/RubikCube/RubikCubeHelpers/RubikCubeFactory';
import { RubikCube2x2Factory } from '@/three.js/RubikCube/classes/RubikCube2x2/RubikCube2x2Factory';

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

const gltfLoader: CustomGLTFLoader = new CustomGLTFLoader();
const factory: RubikCubeFactory = new RubikCube2x2Factory();

onMounted(() => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  gltfLoader.load('RubikDodecahedronVertexPiece.glb', (data) => {
    app.start(data.scene, factory);
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

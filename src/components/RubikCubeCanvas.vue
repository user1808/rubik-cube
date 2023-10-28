<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RubikCubeApp } from '@/three.js/RubikCubeApp';
import { CustomGLTFLoader } from '@/three.js/Common/Custom';
import { RubikCube3x3Factory } from '@/three.js/RubikCube/classes/RubikCube3x3/RubikCube3x3Factory';
import { RubikCube2x2Factory } from '@/three.js/RubikCube/classes/RubikCube2x2/RubikCube2x2Factory';

const canvas = ref<HTMLCanvasElement | null>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp<string, string, string>>>(null);

const gltfLoader: CustomGLTFLoader = new CustomGLTFLoader();
const factories = [RubikCube3x3Factory, RubikCube2x2Factory];

onMounted(() => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  gltfLoader.load('RubikCubePiece.glb', (data) => {
    app.start(new factories[0](data.scene));
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

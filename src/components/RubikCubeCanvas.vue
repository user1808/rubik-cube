<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RubikCubeApp } from '@/three.js/RubikCubeApp';
import { CustomGLTFLoader } from '@/three.js/Common/Custom';
import { RubikCube3x3Factory } from '@/three.js/RubikCube/classes/RubikCube3x3/RubikCube3x3Factory';
import { RubikCube3x3PseudoFacesNames } from '@/three.js/RubikCube/types/RubikCube3x3/TRubikCube3x3PseudoFacesNames';
import { RubikCube3x3RealFacesNames } from '@/three.js/RubikCube/types/RubikCube3x3/TRubikCube3x3RealFacesNames';
import type { AbstractRubikCubeFactory } from '@/three.js/RubikCube/classes/AbstractRubikCube/AbstractRubikCubeFactory';
import { RubikCube2x2Factory } from '@/three.js/RubikCube/classes/RubikCube2x2/RubikCube2x2Factory';
import { RubikCube2x2RealFacesNames } from '@/three.js/RubikCube/types/RubikCube2x2/TRubikCube2x2RealFacesNames';
import { RubikCube2x2PseudoFacesNames } from '@/three.js/RubikCube/types/RubikCube2x2/TRubikCube2x2PseudoFacesNames';
import { RubikCube2x2RotationTypes } from '@/three.js/RubikCube/types/RubikCube2x2/TRubikCube2x2RotationTypes';
import { RubikCube3x3RotationTypes } from '@/three.js/RubikCube/types/RubikCube3x3/TRubikCube3x3RotationTypes';

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const rubikCubeApp = ref<Nullable<RubikCubeApp>>(null);

const gltfLoader: CustomGLTFLoader = new CustomGLTFLoader();
const factories: Array<AbstractRubikCubeFactory> = [
  new RubikCube3x3Factory(
    RubikCube3x3RealFacesNames,
    RubikCube3x3PseudoFacesNames,
    RubikCube2x2RotationTypes,
  ),
  new RubikCube2x2Factory(
    RubikCube2x2RealFacesNames,
    RubikCube2x2PseudoFacesNames,
    RubikCube3x3RotationTypes,
  ),
];

onMounted(() => {
  if (!canvas.value) {
    throw new Error('Canvas HTML Element not found!');
  }
  const app = new RubikCubeApp(canvas.value);
  rubikCubeApp.value = app;
  gltfLoader.load('RubikCubePiece.glb', (data) => {
    app.start(data.scene, factories[0]);
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

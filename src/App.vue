<template>
  <main>
    <RubikCubeCanvas class="fixed left-0 top-0" :filename="filename" />
    <RubikCubeSteps class="fixed inset-x-0 top-0" />
    <CubeTypeStep class="fixed inset-x-0 bottom-0" @change="onFilenameChange" />
  </main>
</template>

<script setup lang="ts">
import RubikCubeCanvas from './components/canvas/RubikCubeCanvas.vue';
import RubikCubeSteps from './components/steps/RubikCubeSteps.vue';
import CubeTypeStep from './components/steps/CubeTypeStep.vue';
import { ref, type Ref } from 'vue';

const filename: Ref<string> = ref<string>('RubikCubePiece.glb');

const onFilenameChange = (newFilename: string) => {
  filename.value = newFilename;
};
</script>

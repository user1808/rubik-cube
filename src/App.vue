<template>
  <main>
    <RubikCubeCanvas class="fixed top-0 left-0" />
    <RubikCubeSteps class="fixed top-0 inset-x-0" />
  </main>
</template>

<script setup lang="ts">
import RubikCubeCanvas from './components/canvas/RubikCubeCanvas.vue';
import RubikCubeSteps from './components/steps/RubikCubeSteps.vue';
</script>

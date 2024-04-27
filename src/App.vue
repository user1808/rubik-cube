<template>
  <main>
    <RubikCubeCanvas class="fixed left-0 top-0" />
    <RubikCubeSteps class="fixed inset-x-0 top-0" />
  </main>
</template>

<script setup lang="ts">
import RubikCubeCanvas from './components/canvas/RubikCubeCanvas.vue';
import RubikCubeSteps from './components/steps/RubikCubeSteps.vue';
</script>

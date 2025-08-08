<template>
  <div>
    <RubikCubeStatus />
    <RubikCubeSettings />
    <RubikCubeCanvas />
  </div>
</template>

<script setup lang="ts">
import RubikCubeCanvas from '@/components/rubik-cube-canvas.vue';
import RubikCubeSettings from '@/components/rubik-cube-settings.vue';
import RubikCubeStatus from '@/components/rubik-cube-status.vue';
</script>

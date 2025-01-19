<template>
  <div class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4">
    <span class="select-none text-xl tracking-tight text-white">Fullscreen</span>
    <Button
      class="w-full text-xl"
      :label="buttonLabel"
      :disabled="!screenfull.isEnabled"
      @click="toggleFullscreen"
    />
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull';
import Button from 'primevue/button';

const buttonLabel = screenfull.isEnabled ? 'Toggle' : 'Unavailable';

const toggleFullscreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};
</script>

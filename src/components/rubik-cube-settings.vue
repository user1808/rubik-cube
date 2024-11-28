<template>
  <UseDraggable
    class="fixed z-50 size-1/2 min-h-16 min-w-min max-w-full select-none resize overflow-auto rounded-md border border-gray-700 bg-black/75"
    :initial-value="{ x: windowWidth / 4, y: windowHeight / 4 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div ref="handle" class="flex cursor-move flex-col bg-gray-800 p-2 text-white">
      <span class="ml-2 text-2xl font-bold leading-tight tracking-tight">Settings</span>
      <i class="pi pi-check text-white"></i>
    </div>
    <div class="h-5" />
  </UseDraggable>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { UseDraggable } from '@vueuse/components';
import { ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
const handle = ref<HTMLElement | null>(null);
</script>

<style lang="css" scoped></style>

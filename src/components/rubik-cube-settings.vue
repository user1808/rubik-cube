<template>
  <UseDraggable
    class="fixed z-50 size-1/2 min-w-min max-w-full select-none resize overflow-auto rounded-md border border-gray-700 bg-black/75 p-2"
    v-slot="{ x, y }"
    :initial-value="{ x: windowWidth / 4, y: windowHeight / 4 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div ref="handle" class="flex flex-col text-white">
      <span>Settings {{ x }} {{ y }}</span>
      <div class="flex gap-4">
        <div v-for="i in 10" :key="i" class="size-5 bg-green-500">
          {{ i }}
        </div>
      </div>
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

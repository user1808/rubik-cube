<template>
  <UseDraggable
    class="fixed z-50 select-none resize overflow-auto rounded-md border border-gray-800 bg-black/60 p-2"
    v-slot="{ x, y }"
    :initial-value="{ x: 10, y: 10 }"
    :prevent-default="true"
    :handle="handle"
  >
    <UseElementSize v-slot="{ width, height }" class="size-full min-w-min max-w-full">
      <div ref="handle" class="flex flex-col text-white">
        <span>Settings {{ x }} {{ y }} {{ width }} {{ height }}</span>
        <div class="flex gap-4">
          <div v-for="i in 10" :key="i" class="size-5 bg-green-500">
            {{ i }}
          </div>
        </div>
      </div>
      <div class="h-5" />
    </UseElementSize>
  </UseDraggable>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { UseDraggable, UseElementSize } from '@vueuse/components';
import { ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
const handle = ref<HTMLElement | null>(null);
</script>

<style lang="css" scoped></style>

<template>
  <UseDraggable
    class="fixed z-50 select-none resize overflow-auto rounded-md bg-black/50 p-2 border border-gray-800"
    v-slot="{ x, y }"
    :initial-value="{ x: 10, y: 10 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div ref="handle" class="flex flex-col text-white">
      <span>Settings {{ x }} {{ y }}</span>
    </div>
    <div class="h-5" />
  </UseDraggable>
</template>

<script setup lang="ts">
import { UseDraggable } from '@vueuse/components';
import { ref } from 'vue';

const handle = ref<HTMLElement | null>(null);
</script>

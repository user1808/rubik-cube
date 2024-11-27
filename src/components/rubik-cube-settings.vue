<template>
  <UseDraggable
    class="fixed z-50 select-none resize overflow-auto rounded-md bg-white p-2"
    v-slot="{ x, y }"
    :initial-value="{ x: 10, y: 10 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div ref="handle" class="flex flex-col">
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

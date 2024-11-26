<template>
  <UseDraggable
    class="fixed z-50 select-none bg-white"
    v-slot="{ x, y }"
    :initial-value="{ x: 10, y: 10 }"
  >
    Drag me! I am at {{ x }}, {{ y }}
  </UseDraggable>
</template>

<script setup lang="ts">
import { UseDraggable } from '@vueuse/components';
</script>

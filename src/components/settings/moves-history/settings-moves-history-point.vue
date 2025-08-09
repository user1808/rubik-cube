<template>
  <div
    class="relative flex cursor-pointer items-center justify-center py-4"
    :class="[targetMove === index ? 'bg-gray-500' : 'hover:bg-gray-600']"
    :style="{ height: `${height}px` }"
    @click="$emit('click', index)"
  >
    <span
      v-if="index !== START_INDEX"
      class="pointer-events-none absolute left-2 select-none text-sm text-gray-300"
    >
      {{ index + 1 }}
    </span>
    <span
      :class="[
        'select-none',
        'text-pretty',
        'text-3xl',
        'text-white',
        index === START_INDEX ? 'text-center' : '',
      ]"
    >
      {{ move.notation }}
    </span>
  </div>
</template>

<script setup lang="ts">
const START_INDEX = -1;

defineProps<{
  move: { notation: string };
  index: number;
  targetMove: number;
  height: number;
}>();

defineEmits<{
  click: [index: number];
}>();
</script>

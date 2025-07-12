<template>
  <kbd class="inline-flex px-2 py-0.5 text-base font-bold text-gray-100"> ⌘{{ keyValue }} </kbd>
</template>

<script setup lang="ts">
defineProps<{
  keyValue: string;
}>();
</script>

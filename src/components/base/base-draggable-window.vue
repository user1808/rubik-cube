<template>
  <UseDraggable
    class="fixed z-50 size-1/2 min-h-16 min-w-min max-w-full select-none resize overflow-auto rounded-md border border-gray-700 bg-black/75"
    :initial-value="{ x: windowWidth / 4, y: windowHeight / 4 }"
    :prevent-default="true"
    :handle="handle"
  >
    <div
      ref="handle"
      class="flex cursor-move flex-row items-center justify-between bg-gray-800 px-4 py-2 text-white"
    >
      <span class="text-2xl font-bold leading-tight tracking-tight"> {{ title }} </span>
      <BaseIconClose @click="$emit('closeWindow')" />
    </div>
    <div class="h-5" />
  </UseDraggable>
</template>

<script setup lang="ts">
import BaseIconClose from './icon/base-icon-close.vue';
import { useWindowSize } from '@vueuse/core';
import { UseDraggable } from '@vueuse/components';
import { ref } from 'vue';

type RubikCubeSettingsProps = {
  title: string;
};
defineProps<RubikCubeSettingsProps>();

type RubikCubeSettingsEmits = {
  closeWindow: [];
};
defineEmits<RubikCubeSettingsEmits>();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const handle = ref<HTMLElement | null>(null);
</script>

<style lang="css" scoped></style>

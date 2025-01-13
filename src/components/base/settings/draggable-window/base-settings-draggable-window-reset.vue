<template>
  <button
    type="button"
    class="fixed z-40 flex items-center gap-x-2 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 focus-visible:outline-none"
    :class="[
      bordersVisibility.left ? 'left-6 sm:left-8' : 'right-6 sm:right-8',
      bordersVisibility.top ? 'top-6 sm:top-8' : 'bottom-6 sm:bottom-8',
    ]"
    @click="$emit('resetWindowSize')"
  >
    <BasePrimeIcon icon="pi-undo" class="p-[6px]" :size="44" />
    <span
      class="line-clamp-2 max-w-44 grow pr-2 text-center text-lg font-bold leading-tight tracking-tight text-white"
    >
      Fit Window To Screen
    </span>
  </button>
</template>

<script setup lang="ts">
import BasePrimeIcon from '../../icon/base-prime-icon.vue';
import type { BaseSettingsDraggableWindowBorders } from './base-settings-draggable-window-borders.type';

type BaseSettingsDraggableWindowResetProps = {
  bordersVisibility: Record<BaseSettingsDraggableWindowBorders, boolean>;
};
defineProps<BaseSettingsDraggableWindowResetProps>();

type BaseSettingsDraggableWindowResetEmits = {
  resetWindowSize: [];
};
defineEmits<BaseSettingsDraggableWindowResetEmits>();
</script>

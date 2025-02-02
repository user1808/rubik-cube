<template>
  <BaseTransitionOpacity>
    <button
      v-if="isSettingsOpen && isSettingsMinimized && isAnyBorderHidden && !isResetWindowPending"
      type="button"
      class="flex items-center gap-x-2 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 focus-visible:outline-none"
      @click="resetWindowSize"
    >
      <BasePrimeIcon icon="pi-undo" class="p-[6px]" :size="44" />
      <span
        class="line-clamp-2 max-w-44 grow pr-2 text-center text-lg font-bold leading-tight tracking-tight text-white"
      >
        Fit Window To Screen
      </span>
    </button>
  </BaseTransitionOpacity>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsWindowDataStore } from '@/stores/use-settings-window-data-store';
import BasePrimeIcon from '../../icon/base-prime-icon.vue';
import { useDraggableWindowEventBus } from '@/event-buses/use-draggable-window-event-bus';
import { useEventBus } from '@vueuse/core';
import { useSettingsStateStore } from '@/stores/use-settings-state-store';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';

const settingsWindowDataStore = useSettingsWindowDataStore();
const { isAnyBorderHidden } = storeToRefs(settingsWindowDataStore);

const draggableWindowEventBus = useEventBus(useDraggableWindowEventBus);
const resetWindowSize = () => draggableWindowEventBus.emit('reset-window-size');

const settingsStateStore = useSettingsStateStore();
const { isSettingsOpen, isSettingsMinimized, isResetWindowPending } =
  storeToRefs(settingsStateStore);
</script>

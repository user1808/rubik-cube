<template>
  <div
    class="fixed z-50 flex flex-col gap-y-4 max-sm:!inset-x-6 max-sm:!bottom-6"
    :class="[
      getBordersVisibility.left && isSettingsMinimized ? 'sm:left-8' : 'sm:right-8',
      getBordersVisibility.top ? 'sm:top-8' : 'sm:bottom-8',
    ]"
  >
    <BaseTransitionOpacity>
      <button
        v-if="isSettingsOpen && isSettingsMinimized && isAnyBorderHidden"
        type="button"
        class="flex items-center gap-x-2 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 focus-visible:outline-none"
        @click="resetWindowSize"
      >
        <BasePrimeIcon icon="pi-undo" class="p-[6px]" :size="44" />
        <span
          class="line-clamp-2 max-w-36 grow pr-2 text-center text-lg font-bold leading-tight tracking-tight text-white xl:max-w-44"
        >
          Fit Window To Screen
        </span>
      </button>
    </BaseTransitionOpacity>
  </div>
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
const { isAnyBorderHidden, getBordersVisibility } = storeToRefs(settingsWindowDataStore);

const draggableWindowEventBus = useEventBus(useDraggableWindowEventBus);
const resetWindowSize = () => draggableWindowEventBus.emit('reset-window-size');

const settingsStateStore = useSettingsStateStore();
const { isSettingsOpen, isSettingsMinimized } = storeToRefs(settingsStateStore);
</script>

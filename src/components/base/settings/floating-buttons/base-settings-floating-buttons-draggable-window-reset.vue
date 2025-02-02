<template>
  <BaseTransitionOpacity>
    <button
      v-if="isSettingsOpen && isSettingsMinimized && isAnyBorderHidden && !isResetWindowPending"
      type="button"
      class="flex items-center gap-x-2 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 focus-visible:outline-none"
      :class="[
        getBordersVisibility.left ? 'left-6 sm:left-8' : 'right-6 sm:right-8',
        getBordersVisibility.top ? 'top-6 sm:top-8' : 'bottom-6 sm:bottom-8',
      ]"
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import debounce from 'lodash.debounce';
import { useSettingsWindowDataStore } from '@/stores/use-settings-window-data-store';
import BasePrimeIcon from '../../icon/base-prime-icon.vue';
import { useDraggableWindowEventBus } from '@/event-buses/use-draggable-window-event-bus';
import { useEventBus } from '@vueuse/core';
import { useSettingsStateStore } from '@/stores/use-settings-state-store';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';

const settingsWindowDataStore = useSettingsWindowDataStore();
const { getBordersVisibility, isAnyBorderHidden } = storeToRefs(settingsWindowDataStore);

const draggableWindowEventBus = useEventBus(useDraggableWindowEventBus);
const isResetWindowPending = ref<boolean>(false);
const resetWindowSize = () => {
  isResetWindowPending.value = true;
  draggableWindowEventBus.emit('reset-window-size');
  debounce(() => (isResetWindowPending.value = false), 20)();
};

const settingsStateStore = useSettingsStateStore();
const { isSettingsOpen, isSettingsMinimized } = storeToRefs(settingsStateStore);
</script>

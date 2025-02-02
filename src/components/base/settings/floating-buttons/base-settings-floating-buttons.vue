<template>
  <div
    class="fixed z-40 flex flex-col gap-y-2"
    :class="[
      getBordersVisibility.left ? 'left-6 sm:left-8' : 'right-6 sm:right-8',
      getBordersVisibility.top ? 'top-6 sm:top-8' : 'bottom-6 sm:bottom-8',
    ]"
  >
    <BaseSettingsFloatingButtonsResetDraggableWindow />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSettingsFloatingButtonsResetDraggableWindow from './base-settings-floating-buttons-draggable-window-reset.vue';
import { useSettingsWindowDataStore } from '@/stores/use-settings-window-data-store';

const settingsWindowDataStore = useSettingsWindowDataStore();
const { getBordersVisibility } = storeToRefs(settingsWindowDataStore);
</script>

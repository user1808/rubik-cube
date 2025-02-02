<template>
  <div class="fixed z-40 flex flex-col gap-y-2">
    <BaseSettingsFloatingButtonsResetDraggableWindow
      :borders-visibility="bordersVisibility"
      @reset-window-size="resetWindowSize"
    />
  </div>
</template>

<script setup lang="ts">
import BaseSettingsFloatingButtonsResetDraggableWindow from './base-settings-floating-buttons-draggable-window-reset.vue';

const bordersVisibility = ref<Record<BaseSettingsDraggableWindowBorders, boolean>>({
  left: true,
  top: true,
});
</script>

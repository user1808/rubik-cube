<template>
  <div class="fixed inset-x-0 bottom-8 z-40 flex items-center justify-center gap-y-4">
    <BaseTransitionOpacity mode="out-in">
      <BaseSettingsFloatingButtonsControlsCameraOrCube
        v-if="interactionMode === 'Camera Or Cube'"
      />
      <BaseSettingsFloatingButtonsControlsCamera v-else-if="interactionMode === 'Cube Only'" />
      <BaseSettingsFloatingButtonsControlsCube v-else-if="interactionMode === 'Camera Only'" />
    </BaseTransitionOpacity>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';
import { useInteractionModeStore } from '@/stores/use-interaction-mode-store';

const BaseSettingsFloatingButtonsControlsCameraOrCube = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-camera-or-cube.vue'),
);
const BaseSettingsFloatingButtonsControlsCamera = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-camera.vue'),
);
const BaseSettingsFloatingButtonsControlsCube = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-cube.vue'),
);

const interactionModeStore = useInteractionModeStore();
const { interactionMode } = storeToRefs(interactionModeStore);
</script>

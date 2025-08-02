<template>
  <div class="fixed inset-x-0 bottom-8 z-40 flex flex-col items-center justify-center gap-y-4">
    <BaseTransitionOpacity mode="out-in">
      <FacesHelperToggle v-if="getIsShowFacesHelperToggleVisible" />
    </BaseTransitionOpacity>
    <BaseTransitionOpacity mode="out-in">
      <BaseSettingsFloatingButtonsControlsCameraOrCube
        v-if="getInteractionMode === 'Camera Or Cube' && !getIsColorCubeModeOn"
      />
      <BaseSettingsFloatingButtonsControlsCamera
        v-else-if="getInteractionMode === 'Cube Only' && !getIsColorCubeModeOn"
      />
      <BaseSettingsFloatingButtonsControlsCube
        v-else-if="getInteractionMode === 'Camera Only' && !getIsColorCubeModeOn"
      />
      <BaseSettingsFloatingButtonsColorCube v-else-if="getIsColorCubeModeOn" />
    </BaseTransitionOpacity>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';
import { useInteractionModeStore } from '@/stores/use-interaction-mode-store';
import FacesHelperToggle from './faces-helpers/faces-helper-toggle.vue';
import { useFacesHelperStore } from '@/stores/use-faces-helper-store';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';

const BaseSettingsFloatingButtonsControlsCameraOrCube = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-camera-or-cube.vue'),
);
const BaseSettingsFloatingButtonsControlsCamera = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-camera.vue'),
);
const BaseSettingsFloatingButtonsControlsCube = defineAsyncComponent(
  () => import('./controls/base-settings-floating-buttons-controls-cube.vue'),
);
const BaseSettingsFloatingButtonsColorCube = defineAsyncComponent(
  () => import('./color-cube/base-settings-floating-buttons-color-cube.vue'),
);

const interactionModeStore = useInteractionModeStore();
const { getInteractionMode } = storeToRefs(interactionModeStore);

const facesHelperStore = useFacesHelperStore();
const { getIsShowFacesHelperToggleVisible } = storeToRefs(facesHelperStore);

const colorCubeModeStateStore = useColorCubeModeStore();
const { getIsColorCubeModeOn } = storeToRefs(colorCubeModeStateStore);
</script>

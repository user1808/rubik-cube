<template>
  <div v-if="settingsSections.length > 0">
    <BaseSettingsFloatingButtonsDraggableWindowReset />
    <BaseSettingsFloatingButtons />
    <BaseSettingsSideDrawer
      :sections="settingsSections"
      :mobile-section="mobileSection"
      v-model:selected-section="selectedSection"
      v-model:open="isSettingsOpen"
      v-model:minimized="isSettingsMinimized"
    >
      <template #content>
        <slot />
      </template>
    </BaseSettingsSideDrawer>
    <BaseSettingsDraggableWindow
      v-if="isMinimizedAvailable"
      :sections="settingsSections"
      v-model:selected-section="selectedSection"
      v-model:open="isSettingsOpen"
      v-model:minimized="isSettingsMinimized"
    >
      <template #content>
        <slot />
      </template>
    </BaseSettingsDraggableWindow>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, defineAsyncComponent } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import type { BaseSettingsSection } from './base-settings-section.type';
import BaseSettingsSideDrawer from './side-drawer/base-settings-side-drawer.vue';
import { useSettingsStateStore } from '@/stores/use-settings-state-store';
import { storeToRefs } from 'pinia';
import BaseSettingsFloatingButtonsDraggableWindowReset from './floating-buttons/base-settings-floating-buttons-draggable-window-reset.vue';
import BaseSettingsFloatingButtons from './floating-buttons/base-settings-floating-buttons.vue';

const BaseSettingsDraggableWindow = defineAsyncComponent(
  () => import('./draggable-window/base-settings-draggable-window.vue'),
);

type BaseSettingsModel = BaseSettingsSection;
const selectedSection = defineModel<BaseSettingsModel>('selectedSection');

type BaseSettingsProps = {
  settingsSections: Array<BaseSettingsSection>;
  mobileSection: BaseSettingsSection;
};
defineProps<BaseSettingsProps>();

const settingsStateStore = useSettingsStateStore();
const { isSettingsOpen, isSettingsMinimized } = storeToRefs(settingsStateStore);

const { current } = useBreakpoints(breakpointsTailwind);
const isMinimizedAvailable = computed(() => current().value.includes('lg'));
watch(isMinimizedAvailable, (newValue) => {
  if (!newValue) isSettingsMinimized.value = false;
});
</script>

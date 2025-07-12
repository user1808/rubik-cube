<template>
  <div v-if="settingsSections.length > 0">
    <BaseSettingsFloatingButtonsDraggableWindowReset />
    <BaseSettingsFloatingButtons />
    <BaseSettingsSideDrawer
      v-model:selected-section="selectedSection"
      :sections="settingsSections"
      :mobile-section="mobileSection"
      :open="getIsSettingsOpen"
      :minimized="getIsSettingsMinimized"
      @update:open="settingsStateStore.setIsSettingsOpen"
      @update:minimized="settingsStateStore.setIsSettingsMinimized"
    >
      <template #content>
        <slot />
      </template>
    </BaseSettingsSideDrawer>
    <BaseSettingsDraggableWindow
      v-if="isMinimizedAvailable"
      v-model:selected-section="selectedSection"
      :sections="settingsSections"
      :open="getIsSettingsOpen"
      :minimized="getIsSettingsMinimized"
      @update:open="settingsStateStore.setIsSettingsOpen"
      @update:minimized="settingsStateStore.setIsSettingsMinimized"
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
import { useSettingsStore } from '@/stores/use-settings-store';
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

const settingsStateStore = useSettingsStore();
const { getIsSettingsOpen, getIsSettingsMinimized } = storeToRefs(settingsStateStore);

const maximizeSettings = (isMinimizedAvailable: boolean): void => {
  if (isMinimizedAvailable === false) {
    settingsStateStore.setIsSettingsMinimized(false);
  }
};

const { current } = useBreakpoints(breakpointsTailwind);
const isMinimizedAvailable = computed<boolean>(() => current().value.includes('lg'));
maximizeSettings(isMinimizedAvailable.value);
watch(isMinimizedAvailable, maximizeSettings);
</script>

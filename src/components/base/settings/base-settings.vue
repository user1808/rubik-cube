<template>
  <div v-if="settingsSections.length > 0">
    <BaseSettingsSideDrawer
      :sections="settingsSections"
      :mobile-section="mobileSection"
      v-model:selected-section="selectedSection"
      v-model:open="isSettingsOpen"
      v-model:minimized="isSettingsMinimized"
    />
    <BaseSettingsDraggableWindow
      :sections="settingsSections"
      v-model:selected-section="selectedSection"
      v-model:open="isSettingsOpen"
      v-model:minimized="isSettingsMinimized"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import type { BaseSettingsSection } from './base-settings-section.type';
import BaseSettingsSideDrawer from './side-drawer/base-settings-side-drawer.vue';
import BaseSettingsDraggableWindow from './draggable-window/base-settings-draggable-window.vue';

type BaseSettingsProps = {
  settingsSections: Array<BaseSettingsSection>;
  mobileSection: BaseSettingsSection;
};
const props = defineProps<BaseSettingsProps>();

type IsSettingsOpen = boolean;
type IsSettingsMinimized = boolean;

const selectedSection = ref<BaseSettingsSection>(props.settingsSections[0]);
const isSettingsOpen = ref<IsSettingsOpen>(false);
const isSettingsMinimized = ref<IsSettingsMinimized>(false);

const { current } = useBreakpoints(breakpointsTailwind);
const isMinimizedAvailable = computed(() => current().value.includes('lg'));
watch(isMinimizedAvailable, (newValue) => {
  if (!newValue) isSettingsMinimized.value = false;
});
</script>

<template>
  <BaseSettings
    :mobile-section="mobileSection"
    :settings-sections="settingsSections"
    v-model:selected-section="selectedSection"
  >
    <div class="mx-auto max-w-56 flex-col xs:max-w-72 sm:max-w-80 md:max-w-sm">
      <component v-for="(part, idx) in selectedSection.content" :key="idx" :is="part" />
    </div>
  </BaseSettings>
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue';
import BasePrimeIcon from './base/icon/base-prime-icon.vue';
import BaseSettings from './base/settings/base-settings.vue';
import type { BaseSettingsSection } from './base/settings/base-settings-section.type';
import BaseIcon2x2Cube from './base/icon/base-icon-2x2-cube.vue';
import SettingsSelectCubeType from './settings/select-cube-type/settings-select-cube-type.vue';
import SettingsCheckboxShowFacesHelper from './settings/checkbox-show-faces-helper/checkbox-show-faces-helper.vue';
import SettingsCheckboxHideSectionsTitles from './settings/checkbox-hide-sections-titles/checkbox-hide-sections-titles.vue';
import SettingsToggleFullscreen from './settings/toggle-fullscreen/settings-toggle-fullscreen.vue';
import SettingsSelectInteractionMode from './settings/select-interaction-mode/settings-select-interaction-mode.vue';
import SettingsSetCubeColors from './settings/set-cube-colors/settings-set-cube-colors.vue';
import BaseIconMoves from './base/icon/base-icon-moves.vue';
import SettingsMovesHistory from './settings/moves-history/settings-moves-history.vue';
import SettingsSetRotationTime from './settings/set-rotation-time/settings-set-rotation-time.vue';

const mobileSection: BaseSettingsSection = {
  title: 'Open Menu',
  icon: BasePrimeIcon,
  iconBind: { icon: 'pi-bars', class: 'p-[6px]', size: 44 },
};

const settingsSections: Array<BaseSettingsSection> = [
  {
    title: 'Cube Settings',
    icon: markRaw(BaseIcon2x2Cube),
    iconBind: { class: 'size-14 min-h-14 min-w-14' },
    content: [
      markRaw(SettingsSelectCubeType),
      markRaw(SettingsSetRotationTime),
      markRaw(SettingsCheckboxShowFacesHelper),
      markRaw(SettingsSetCubeColors),
    ],
  },
  {
    title: 'General Settings',
    icon: markRaw(BasePrimeIcon),
    iconBind: { icon: 'pi-cog', class: 'p-[6px]', size: 44 },
    content: [
      markRaw(SettingsCheckboxHideSectionsTitles),
      markRaw(SettingsToggleFullscreen),
      markRaw(SettingsSelectInteractionMode),
    ],
  },
  {
    title: 'Moves',
    icon: markRaw(BaseIconMoves),
    iconBind: { class: 'size-14 min-h-14 min-w-14' },
    content: [markRaw(SettingsMovesHistory)],
  },
];

const selectedSection = ref<BaseSettingsSection>(settingsSections[0]);
</script>

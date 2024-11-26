<template>
  <BaseSettings :mobile-section="mobileSection" :settings-sections="settingsSections" />
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import BaseIconCube from './base/icon/base-icon-cube.vue';
import BasePrimeIcon from './base/icon/base-prime-icon.vue';
import BaseSettings from './base/settings/base-settings.vue';
import type { BaseSettingsSection } from './base/settings/base-settings-section.type';

const mobileSection: BaseSettingsSection = {
  title: 'Open Menu',
  icon: BasePrimeIcon,
  iconBind: { icon: 'pi-bars', class: 'text-[44px] p-[6px]' },
};

const settingsSections: Array<BaseSettingsSection> = [
  { title: 'Cube Settings', icon: markRaw(BaseIconCube), iconBind: { class: 'size-14' } },
  {
    title: 'General Settings',
    icon: markRaw(BasePrimeIcon),
    iconBind: { icon: 'pi-cog', class: 'text-[44px] p-[6px]' },
  },
];
</script>

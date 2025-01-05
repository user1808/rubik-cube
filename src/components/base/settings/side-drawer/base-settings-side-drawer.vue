<template>
  <Popover class="relative">
    <div class="fixed left-6 top-6 z-40 sm:left-8 sm:top-8">
      <BaseSettingsSideDrawerButtons
        class="sm:hidden"
        :isSideDrawerOpen="open"
        :sections="[mobileSection]"
        hide-title
        @selectSection="selectSection(selectedSection || sections[0])"
      />
      <BaseSettingsSideDrawerButtons
        class="max-sm:hidden"
        :isSideDrawerOpen="open"
        :sections="sections"
        @selectSection="selectSection"
      />
    </div>
    <BaseTransitionOpacity>
      <PopoverOverlay
        class="fixed inset-0 z-50 bg-black/50"
        v-if="selectedSection && open && !minimized"
        static
        @mousemove.stop
        @mousedown.stop
        @touchmove.stop
        @touchstart.stop
        @click="closeDrawer"
      />
    </BaseTransitionOpacity>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <PopoverPanel
        class="absolute inset-y-0 left-0 z-50 h-screen w-screen max-w-sm sm:max-w-md md:max-w-lg"
        v-if="selectedSection && open && !minimized"
        static
        @mousemove.stop
        @mousedown.stop
        @touchmove.stop
        @touchstart.stop
      >
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between gap-x-2 bg-gray-800 p-4 pr-0 text-white">
            <slot name="header">
              <div class="flex select-none items-center gap-x-2">
                <component
                  v-if="selectedSection.icon"
                  :is="selectedSection.icon"
                  v-bind="selectedSection.iconBind"
                />
                <span
                  class="text-2xl font-bold leading-6 tracking-tight max-sm:[word-spacing:-0.5rem]"
                >
                  {{ selectedSection.title }}
                </span>
              </div>
              <div class="flex items-center gap-x-1">
                <BasePrimeIcon
                  icon="pi-window-minimize"
                  class="-scale-x-100 cursor-pointer px-2 hover:opacity-75 max-lg:hidden"
                  :size="28"
                  @click="minimizeSettings"
                />
                <BasePrimeIcon
                  icon="pi-times"
                  class="cursor-pointer pl-2 pr-4 hover:opacity-75"
                  :size="40"
                  @click="closeDrawer"
                />
              </div>
            </slot>
          </div>
          <div class="flex grow">
            <div class="grow bg-gray-800">
              <slot name="content" />
            </div>
            <BaseSettingsSections v-model:selected-section="selectedSection" :sections="sections" />
          </div>
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverPanel, PopoverOverlay } from '@headlessui/vue';
import type { BaseSettingsSection } from '../base-settings-section.type';
import BasePrimeIcon from '../../icon/base-prime-icon.vue';
import BaseSettingsSideDrawerButtons from './base-settings-side-drawer-buttons.vue';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';
import BaseSettingsSections from '../base-settings-sections.vue';

const selectedSection = defineModel<BaseSettingsSection>('selectedSection');
const open = defineModel<boolean>('open', { default: false });
const minimized = defineModel<boolean>('minimized', { default: false });

type BaseSettingsSideDrawerProps = {
  mobileSection: BaseSettingsSection;
  sections: Array<BaseSettingsSection>;
};
defineProps<BaseSettingsSideDrawerProps>();

const selectSection = (section: BaseSettingsSection) => {
  selectedSection.value = section;
  open.value = true;
};
const closeDrawer = () => (open.value = false);
const minimizeSettings = () => (minimized.value = true);
</script>

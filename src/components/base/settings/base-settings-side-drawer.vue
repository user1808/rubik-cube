<template>
  <Popover class="relative">
    <div class="fixed left-4 top-4 z-40 flex flex-col gap-y-4 sm:left-8 sm:top-8">
      <Transition
        v-for="(section, idx) in sections"
        :key="idx"
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <PopoverButton class="flex items-center gap-x-4 rounded-lg bg-gray-800 py-2 pl-2 pr-4">
          <BaseIconCube class="size-14" />
          <span class="max-w-44 text-lg font-bold leading-tight tracking-tight text-white">
            {{ section.title }}
          </span>
        </PopoverButton>
      </Transition>
    </div>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PopoverOverlay
        class="fixed inset-0 z-50 bg-black/50"
        @mousemove.stop
        @mousedown.stop
        @touchmove.stop
        @touchstart.stop
      />
    </Transition>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <PopoverPanel
        class="absolute inset-y-0 left-0 z-50 h-screen w-screen max-w-sm bg-white"
        @mousemove.stop
        @mousedown.stop
        @touchmove.stop
        @touchstart.stop
      >
        <div class="flex flex-col">
          <div class="flex items-center justify-between gap-x-4 bg-gray-800 p-4 text-white">
            <slot name="header">
              <div class="flex select-none items-center gap-x-1">
                <BaseIconCube class="size-10" />
                <span class="text-nowrap text-2xl font-bold leading-tight tracking-tight">
                  Title
                </span>
              </div>
              <div class="flex gap-x-3">
                <BaseIconMinimize class="max-md:hidden" />
                <BaseIconClose />
              </div>
            </slot>
          </div>
          <div>
            <slot name="content" />
          </div>
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue';
import type { BaseSettingsSection } from './base-settings-section.type';
import BaseIconCube from '../icon/base-icon-cube.vue';

type BaseSettingsSideDrawerProps = {
  sections: Array<BaseSettingsSection>;
};
defineProps<BaseSettingsSideDrawerProps>();
</script>

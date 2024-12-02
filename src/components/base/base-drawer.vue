<template>
  <Popover class="relative">
    <PopoverButton class="fixed left-0 z-50 flex items-center gap-x-4 bg-gray-800 px-6 py-2">
      <BaseIconCube class="size-12" />
      <span class="font-semibold uppercase tracking-wide text-white">{{ title }}</span>
    </PopoverButton>
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
        v-slot="{ close }"
        @mousemove.stop
        @mousedown.stop
        @touchmove.stop
        @touchstart.stop
      >
        <div class="flex flex-col">
          <div
            class="flex flex-row items-center justify-between gap-x-4 bg-gray-800 p-4 text-white"
          >
            <slot name="header">
              <span class="text-nowrap text-2xl font-bold leading-tight tracking-tight">
                {{ title }}
              </span>
              <div class="flex gap-x-3">
                <BaseIconMinimize class="max-md:hidden" @click="onMinimize(close)" />
                <BaseIconClose @click="close" />
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
import BaseIconClose from './icon/base-icon-close.vue';
import BaseIconCube from './icon/base-icon-cube.vue';
import BaseIconMinimize from './icon/base-icon-minimize.vue';

type BaseDrawerProps = {
  title: string;
};
defineProps<BaseDrawerProps>();

type BaseDrawerEmits = {
  minimize: [];
};
const emits = defineEmits<BaseDrawerEmits>();

const onMinimize = (closePanelCallback: () => void) => {
  closePanelCallback();
  emits('minimize');
};
</script>

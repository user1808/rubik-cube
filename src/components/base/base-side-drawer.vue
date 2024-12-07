<template>
  <Popover class="relative">
    <PopoverButton
      class="fixed z-40 flex items-center gap-x-4 rounded-lg bg-gray-800 p-2.5 transition-opacity duration-200 ease-out sm:left-8 sm:top-8"
      :class="[{ 'cursor-not-allowed opacity-40': disabled }, buttonTopClass, buttonLeftClass]"
      :disabled="disabled"
      @click="onSwitchOpen"
    >
      <BaseIconCube class="size-14" />
      <span class="text-nowrap text-lg font-bold leading-tight tracking-tight text-white">
        {{ title }}
      </span>
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
        v-if="open && !minimize"
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
        v-if="open && !minimize"
        static
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
                  {{ title }}
                </span>
              </div>
              <div class="flex gap-x-3">
                <BaseIconMinimize class="max-md:hidden" @click="onMinimize" />
                <BaseIconClose @click="onSwitchOpen" />
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

type BaseSideDrawerOpenModel = boolean;
const open = defineModel<BaseSideDrawerOpenModel>('open', { required: true });

type BaseSideDrawerMinimizeModel = boolean;
const minimize = defineModel<BaseSideDrawerMinimizeModel>('minimize');

type BaseSideDrawerProps = {
  title: string;
  buttonTopClass?: `top-${string}`;
  buttonLeftClass?: `left-${string}`;
  disabled?: boolean;
};
withDefaults(defineProps<BaseSideDrawerProps>(), {
  buttonTopClass: 'top-4',
  buttonLeftClass: 'left-4',
});

type BaseSideDrawerSlots = {
  header(): any;
  content(): any;
};
defineSlots<BaseSideDrawerSlots>();

const onSwitchOpen = () => (open.value = !open.value);
const onMinimize = () => (minimize.value = true);
</script>

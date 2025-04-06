<template>
  <div
    class="flex flex-col items-stretch justify-center overflow-hidden rounded-lg bg-gray-800 sm:flex-row"
  >
    <div
      class="flex flex-1 flex-row items-center justify-center gap-x-2 border-gray-700 px-5 text-center max-sm:order-last max-sm:border-t max-sm:py-0.5 sm:flex-col"
    >
      <BasePrimeIcon icon="pi-video" :size="44" />
      <span class="select-none text-sm font-bold leading-4 text-white"> Camera<br />Controls </span>
    </div>
    <div class="flex flex-row">
      <button
        class="group relative flex min-w-fit flex-1 cursor-pointer items-center justify-center border-x border-gray-700 px-4 transition-colors hover:bg-gray-700 sm:px-5"
        :class="{ 'bg-gray-600': activeKeys.a }"
        type="button"
        v-ripple
        @mousedown="startContinuousEvent('rotate-left')"
        @mouseup="stopContinuousEvent"
        @mouseleave="stopContinuousEvent"
        @touchstart.prevent="startContinuousEvent('rotate-left')"
        @touchend="stopContinuousEvent"
        @touchcancel="stopContinuousEvent"
      >
        <BaseKeyboardInputElement
          class="absolute left-0 top-0 z-10 opacity-0 group-hover:opacity-100"
          :class="{ 'opacity-100': activeKeys.a }"
          key-value="A"
        />
        <Icon
          icon="mingcute:rotate-x-line"
          color="white"
          style="font-size: 44px"
          height="44px"
          width="44px"
        />
      </button>
      <div class="flex flex-1 flex-col items-center justify-center">
        <button
          class="group relative flex cursor-pointer items-center justify-center border-b border-gray-700 px-4 py-2 transition-colors hover:bg-gray-700 sm:px-8"
          :class="{ 'bg-gray-600': activeKeys.w }"
          type="button"
          v-ripple
          @mousedown="startContinuousEvent('rotate-top')"
          @mouseup="stopContinuousEvent"
          @mouseleave="stopContinuousEvent"
          @touchstart.prevent="startContinuousEvent('rotate-top')"
          @touchend="stopContinuousEvent"
          @touchcancel="stopContinuousEvent"
        >
          <BaseKeyboardInputElement
            class="absolute left-0 top-0 z-10 opacity-0 group-hover:opacity-100"
            :class="{ 'opacity-100': activeKeys.w }"
            key-value="W"
          />
          <Icon
            icon="mingcute:rotate-y-line"
            color="white"
            style="font-size: 44px"
            height="44px"
            width="44px"
          />
        </button>
        <button
          class="group relative flex cursor-pointer items-center justify-center px-4 py-2 transition-colors hover:bg-gray-700 sm:px-8"
          :class="{ 'bg-gray-600': activeKeys.s }"
          type="button"
          v-ripple
          @mousedown="startContinuousEvent('rotate-bottom')"
          @mouseup="stopContinuousEvent"
          @mouseleave="stopContinuousEvent"
          @touchstart.prevent="startContinuousEvent('rotate-bottom')"
          @touchend="stopContinuousEvent"
          @touchcancel="stopContinuousEvent"
        >
          <BaseKeyboardInputElement
            class="absolute left-0 top-0 z-10 opacity-0 group-hover:opacity-100"
            :class="{ 'opacity-100': activeKeys.s }"
            key-value="S"
          />
          <Icon
            class="-scale-y-100"
            icon="mingcute:rotate-y-line"
            color="white"
            style="font-size: 44px"
            height="44px"
            width="44px"
          />
        </button>
      </div>
      <button
        class="group relative flex min-w-fit flex-1 cursor-pointer items-center justify-center border-x border-gray-700 px-4 transition-colors hover:bg-gray-700 sm:px-5"
        :class="{ 'bg-gray-600': activeKeys.d }"
        type="button"
        v-ripple
        @mousedown="startContinuousEvent('rotate-right')"
        @mouseup="stopContinuousEvent"
        @mouseleave="stopContinuousEvent"
        @touchstart.prevent="startContinuousEvent('rotate-right')"
        @touchend="stopContinuousEvent"
        @touchcancel="stopContinuousEvent"
      >
        <BaseKeyboardInputElement
          class="absolute left-0 top-0 z-10 opacity-0 group-hover:opacity-100"
          :class="{ 'opacity-100': activeKeys.d }"
          key-value="D"
        />
        <Icon
          class="-scale-x-100"
          icon="mingcute:rotate-x-line"
          color="white"
          style="font-size: 44px"
          height="44px"
          width="44px"
        />
      </button>
      <div class="flex flex-1 flex-col items-center justify-center">
        <button
          class="group relative flex cursor-pointer items-center justify-center border-b border-gray-700 px-4 py-2 transition-colors hover:bg-gray-700 sm:px-8"
          :class="{ 'bg-gray-600': activeKeys.r }"
          type="button"
          v-ripple
          @mousedown="startContinuousEvent('zoom-in')"
          @mouseup="stopContinuousEvent"
          @mouseleave="stopContinuousEvent"
          @touchstart.prevent="startContinuousEvent('zoom-in')"
          @touchend="stopContinuousEvent"
          @touchcancel="stopContinuousEvent"
        >
          <BaseKeyboardInputElement
            class="absolute top-0 z-10 opacity-0 group-hover:opacity-100 max-sm:right-0 sm:left-0"
            :class="{ 'opacity-100': activeKeys.r }"
            key-value="R"
          />
          <Icon
            icon="mdi:magnify-plus-outline"
            color="white"
            style="font-size: 44px"
            height="44px"
            width="44px"
          />
        </button>
        <button
          class="group relative flex cursor-pointer items-center justify-center px-4 py-2 transition-colors hover:bg-gray-700 sm:px-8"
          :class="{ 'bg-gray-600': activeKeys.f }"
          type="button"
          v-ripple
          @mousedown="startContinuousEvent('zoom-out')"
          @mouseup="stopContinuousEvent"
          @mouseleave="stopContinuousEvent"
          @touchstart.prevent="startContinuousEvent('zoom-out')"
          @touchend="stopContinuousEvent"
          @touchcancel="stopContinuousEvent"
        >
          <BaseKeyboardInputElement
            class="absolute top-0 z-10 opacity-0 group-hover:opacity-100 max-sm:right-0 sm:left-0"
            :class="{ 'opacity-100': activeKeys.f }"
            key-value="F"
          />
          <Icon
            icon="mdi:magnify-minus-outline"
            color="white"
            style="font-size: 44px"
            height="44px"
            width="44px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import BasePrimeIcon from '@/components/base/icon/base-prime-icon.vue';
import { Icon } from '@iconify/vue';
import BaseKeyboardInputElement from '@/components/base/base-keyboard-input-element.vue';
import { onKeyDown, onKeyUp, useEventBus } from '@vueuse/core';
import { useOrbitControlsEventBus } from '@/event-buses/use-orbit-controls-event-bus';

const orbitControlsEventBus = useEventBus(useOrbitControlsEventBus);

const activeKeys = ref({
  a: false,
  w: false,
  s: false,
  d: false,
  r: false,
  f: false,
});
const handleKey = (key: keyof typeof activeKeys.value, isPressed: boolean) => {
  activeKeys.value[key] = isPressed;
};

const eventTimer = ref<number | null>(null);

const startContinuousEvent = (
  eventName: Required<Parameters<typeof orbitControlsEventBus.emit>[0]>,
) => {
  if (eventTimer.value) return;

  const emitEvent = () => {
    orbitControlsEventBus.emit(eventName);
    eventTimer.value = requestAnimationFrame(emitEvent);
  };

  emitEvent();
};

const stopContinuousEvent = () => {
  if (eventTimer.value) {
    cancelAnimationFrame(eventTimer.value);
    eventTimer.value = null;
  }
};

const startContinuousEventWithKey = (
  e: KeyboardEvent,
  key: keyof typeof activeKeys.value,
  eventName: Required<Parameters<typeof orbitControlsEventBus.emit>[0]>,
) => {
  if (eventTimer.value) return;
  e.preventDefault();
  handleKey(key, true);
  startContinuousEvent(eventName);
};

const stopContinuousEventWithKey = (key: keyof typeof activeKeys.value) => {
  if (!activeKeys.value[key]) return;
  handleKey(key, false);
  stopContinuousEvent();
};

onKeyDown(['a', 'A'], (e) => startContinuousEventWithKey(e, 'a', 'rotate-left'));
onKeyDown(['w', 'W'], (e) => startContinuousEventWithKey(e, 'w', 'rotate-top'));
onKeyDown(['s', 'S'], (e) => startContinuousEventWithKey(e, 's', 'rotate-bottom'));
onKeyDown(['d', 'D'], (e) => startContinuousEventWithKey(e, 'd', 'rotate-right'));
onKeyDown(['r', 'R'], (e) => startContinuousEventWithKey(e, 'r', 'zoom-in'));
onKeyDown(['f', 'F'], (e) => startContinuousEventWithKey(e, 'f', 'zoom-out'));

onKeyUp(['a', 'A'], () => stopContinuousEventWithKey('a'));
onKeyUp(['w', 'W'], () => stopContinuousEventWithKey('w'));
onKeyUp(['s', 'S'], () => stopContinuousEventWithKey('s'));
onKeyUp(['d', 'D'], () => stopContinuousEventWithKey('d'));
onKeyUp(['r', 'R'], () => stopContinuousEventWithKey('r'));
onKeyUp(['f', 'F'], () => stopContinuousEventWithKey('f'));

onUnmounted(() => {
  stopContinuousEvent();
});
</script>

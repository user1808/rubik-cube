<template>
  <SelectButton
    :model-value="getCameraOrCubeOption"
    :options="getCameraOrCubeOptions"
    :allow-empty="false"
    class="h-16 w-full px-4 sm:w-72 sm:px-0"
    :pt="{
      pcToggleButton: {
        root: 'group basis-1/2 !bg-gray-800 hover:!bg-gray-700 !border-gray-800 hover:!border-gray-700',
        content: 'relative size-full',
      },
    }"
    @update:model-value="interactionModeStore.setCameraOrCubeOption"
  >
    <template #option="{ option }">
      <BaseKeyboardInputElement
        class="absolute top-0 z-10 -translate-y-1/3 opacity-0 transition-opacity duration-300 group-first-of-type:left-0 group-first-of-type:-translate-x-1/2 group-last-of-type:right-0 group-last-of-type:translate-x-1/2 group-data-[p-checked=false]:group-hover:opacity-100"
        key-value="Q"
      />
      <span class="text-lg font-bold text-white group-data-[p-checked=true]:text-black">
        {{ option }}
      </span>
    </template>
  </SelectButton>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import SelectButton from 'primevue/selectbutton';
import { useInteractionModeStore } from '@/stores/use-interaction-mode-store';
import { onKeyPressed } from '@vueuse/core';
import BaseKeyboardInputElement from '@/components/base/base-keyboard-input-element.vue';
const interactionModeStore = useInteractionModeStore();
const { getCameraOrCubeOption, getCameraOrCubeOptions } = storeToRefs(interactionModeStore);

onKeyPressed(['q', 'Q'], (event) => {
  event.preventDefault();
  interactionModeStore.toggleCameraOrCubeOption();
});
</script>

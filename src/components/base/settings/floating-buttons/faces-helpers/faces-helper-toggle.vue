<template>
  <ToggleButton
    :model-value="getIsFacesHelperVisible"
    @update:model-value="toggleIsFacesHelperVisible"
    class="group relative p-0"
    :class="{
      'border-gray-700 bg-gray-800 text-white hover:!border-gray-600 hover:!bg-gray-700 hover:!text-white':
        !getIsFacesHelperVisible,
    }"
  >
    <template #default>
      <div class="flex items-center gap-x-2 px-2 py-4">
        <span class="w-48">{{
          getIsFacesHelperVisible ? 'Faces Helper On' : 'Faces Helper Off'
        }}</span>
        <BaseKeyboardInputElement
          class="absolute -right-1 -top-1 z-10 opacity-0 group-hover:opacity-100"
          :class="{
            '!text-black': getIsFacesHelperVisible,
          }"
          key-value="Space"
        />
      </div>
    </template>
  </ToggleButton>
</template>

<script setup lang="ts">
import ToggleButton from 'primevue/togglebutton';
import { useFacesHelperStateStore } from '@/stores/use-faces-helper-state-store';
import { storeToRefs } from 'pinia';
import BaseKeyboardInputElement from '@/components/base/base-keyboard-input-element.vue';
import { onKeyDown, onKeyUp } from '@vueuse/core';
import { ref } from 'vue';

const facesHelperStateStore = useFacesHelperStateStore();
const { getIsFacesHelperVisible } = storeToRefs(facesHelperStateStore);

const toggleIsFacesHelperVisible = () => {
  facesHelperStateStore.toggleIsFacesHelperVisible();
};

const isSpacePressed = ref<boolean>(false);
onKeyDown('Space', () => {
  if (isSpacePressed.value) return;
  facesHelperStateStore.toggleIsFacesHelperVisible();
  isSpacePressed.value = true;
});
onKeyUp('Space', () => {
  isSpacePressed.value = false;
});
</script>

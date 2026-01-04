<template>
  <ToggleButton
    :model-value="getIsFacesHelperVisible"
    @update:model-value="facesHelperStore.setIsFacesHelperVisible"
    class="group relative p-0"
    :class="{
      'border-gray-700 bg-gray-800 text-white hover:!border-gray-600 hover:!bg-gray-700 hover:!text-white':
        !getIsFacesHelperVisible,
    }"
  >
    <template #default>
      <div class="flex items-center gap-x-2 px-2 py-2.5">
        <span class="w-48">
          {{ getIsFacesHelperVisible ? 'Faces Helper On' : 'Faces Helper Off' }}
        </span>
      </div>
    </template>
  </ToggleButton>
</template>

<script setup lang="ts">
import ToggleButton from 'primevue/togglebutton';
import { useFacesHelperStore } from '@/stores/use-faces-helper-store';
import { storeToRefs } from 'pinia';

const facesHelperStore = useFacesHelperStore();
const { getIsFacesHelperVisible } = storeToRefs(facesHelperStore);
</script>

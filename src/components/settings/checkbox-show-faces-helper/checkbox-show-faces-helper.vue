<template>
  <div class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4">
    <h1 class="select-none text-xl tracking-tight text-white">Faces Helper</h1>
    <div
      class="flex max-w-fit cursor-pointer items-center gap-x-4 px-1 py-2"
      @click.prevent="toggleShowFacesHelperToggleVisible"
    >
      <Checkbox binary :model-value="getIsShowFacesHelperToggleVisible" />
      <span class="select-none text-pretty text-sm leading-4 text-gray-400">
        Show faces helper toggle
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { useFacesHelperStateStore } from '@/stores/use-faces-helper-state-store';
import { storeToRefs } from 'pinia';

const facesHelperStateStore = useFacesHelperStateStore();
const { getIsShowFacesHelperToggleVisible } = storeToRefs(facesHelperStateStore);

const toggleShowFacesHelperToggleVisible = () => {
  facesHelperStateStore.toggleIsShowFacesHelperToggleVisible();
};
</script>

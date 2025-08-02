<template>
  <div class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4">
    <h1 class="select-none text-xl tracking-tight text-white">Select Interaction Mode</h1>
    <Select
      :model-value="getInteractionMode"
      :options="getInteractionModes"
      @update:model-value="interactionModeStore.setInteractionMode"
    />
    <small class="select-none text-pretty text-sm leading-4 text-gray-400">
      {{ getInteractionModeDescription }}
    </small>
  </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import { storeToRefs } from 'pinia';
import { useInteractionModeStore } from '../../../stores/use-interaction-mode-store';

const interactionModeStore = useInteractionModeStore();
const { getInteractionMode, getInteractionModes, getInteractionModeDescription } =
  storeToRefs(interactionModeStore);
</script>

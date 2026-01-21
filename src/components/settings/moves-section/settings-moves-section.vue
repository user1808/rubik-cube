<template>
  <div class="relative flex size-full flex-col px-4 pb-4">
    <h1 class="shrink-0 select-none text-nowrap py-4 text-xl tracking-tight text-white">
      Moves History For {{ currentCubeName ?? 'No cube selected' }}
    </h1>
    <div class="flex min-h-0 flex-1">
      <SettingsMovesHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import SettingsMovesHistory from '../moves-history/settings-moves-history.vue';

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

const currentCubeName = computed(() => getCurrentCubeProperties.value?.commonName);
</script>

<template>
  <div class="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 p-2">
    <div v-if="isCubeSolved" class="flex items-center gap-1">
      <BasePrimeIcon icon="pi-check-circle" :size="16" />
      <span class="text-sm text-white"> Solved </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import BasePrimeIcon from './base/icon/base-prime-icon.vue';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';

const facesLogicalValuesStore = useFacesLogicalValuesStore();
const { isCubeSolved } = storeToRefs(facesLogicalValuesStore);
</script>

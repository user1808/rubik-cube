<template>
  <div class="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 p-2">
    <div v-if="isCubeSolved" class="flex items-center gap-1">
      <BasePrimeIcon icon="pi-check-circle" :size="16" />
      <span class="text-sm font-bold text-white"> Solved </span>
    </div>
    <div class="flex items-center gap-1">
      <BasePrimeIcon
        :icon="isCubeSolvable ? 'pi-check-circle' : 'pi-exclamation-triangle'"
        :size="16"
      />
      <span class="text-sm font-bold text-white">
        {{ isCubeSolvable ? 'Solvable' : 'Unsolvable' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BasePrimeIcon from './base/icon/base-prime-icon.vue';
import { useIsCubeSolved } from '@/composables/useIsCubeSolved';
import { useIsCubeSolvable } from '@/composables/useIsCubeSolvable';

const { isCubeSolved } = useIsCubeSolved();
const { isCubeSolvable } = useIsCubeSolvable();
</script>

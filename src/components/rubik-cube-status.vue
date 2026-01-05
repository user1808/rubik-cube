<template>
  <div class="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-4 p-2">
    <div v-if="isCubeSolved" class="flex items-center gap-1">
      <BasePrimeIcon icon="pi-check-circle" :size="16" />
      <span class="text-sm font-bold text-white"> Solved </span>
    </div>
    <div class="flex items-center gap-1" :class="isCubeSolvable ? '' : 'opacity-70'">
      <BasePrimeIcon
        :icon="isCubeSolvable ? 'pi-check' : 'pi-exclamation-triangle'"
        :size="16"
        :class="isCubeSolvable ? 'text-white' : 'text-gray-50'"
      />
      <span class="text-sm font-bold" :class="isCubeSolvable ? 'text-white' : 'text-gray-50'">
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

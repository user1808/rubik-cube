<template>
  <menu class="m-auto flex w-full max-w-6xl flex-row gap-x-6 overflow-x-auto bg-black p-4">
    <li
      class="group flex w-full cursor-pointer select-none flex-col gap-y-1"
      v-for="(factory, idx) in factories"
      :key="idx"
      @click="onStepClick(idx)"
    >
      <div
        class="flex flex-row items-end justify-center gap-x-2 lg:gap-x-4"
        :class="[
          idx === selectedFactoryIdx
            ? 'text-white'
            : 'text-neutral-700 group-hover:text-neutral-500',
        ]"
      >
        <span class="text-nowrap text-base md:pb-2.5 lg:pb-3">
          {{ factory.commonName }}
        </span>
      </div>
    </li>
  </menu>
</template>

<script setup lang="ts">
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces';

defineProps<{
  factories: Array<IRubikCubeFactory<Record<string, string>>>;
  selectedFactoryIdx: number;
}>();

const emits = defineEmits<{
  [`update:selectedFactoryIdx`]: [newIdx: number];
}>();

const onStepClick = (newIdx: number) => {
  emits('update:selectedFactoryIdx', newIdx);
};
</script>

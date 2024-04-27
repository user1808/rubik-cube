<template>
  <menu class="m-auto flex w-full max-w-6xl flex-row gap-x-6 bg-black p-4">
    <li
      class="group flex w-full cursor-pointer select-none flex-col gap-y-1"
      v-for="(step, idx) in steps"
      :key="idx"
      @click="onStepClick(idx)"
    >
      <div
        class="flex flex-row items-end justify-center gap-x-2 lg:gap-x-4"
        :class="[
          idx <= chosenStepIdx ? 'text-white' : 'text-neutral-700 group-hover:text-neutral-500',
        ]"
      >
        <span class="hidden sm:block sm:text-4xl md:text-6xl lg:text-7xl">{{ idx + 1 }}</span>
        <span class="text-nowrap text-sm sm:text-base md:pb-2.5 md:text-base lg:pb-3 lg:text-lg">
          {{ step }}
        </span>
      </div>
    </li>
  </menu>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

const steps: Array<string> = ['Choose Cube Type', 'Set Face Colors', 'Play With It', 'Solve It'];
const chosenStepIdx: Ref<number> = ref<number>(0);

const onStepClick = (newIdx: number) => (chosenStepIdx.value = newIdx);
</script>

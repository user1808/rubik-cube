<template>
  <menu class="flex flex-row m-auto p-4 gap-x-6 max-w-6xl w-full bg-black">
    <li
      class="flex flex-col group gap-y-1 cursor-pointer select-none w-full"
      :class="{ 'active-step': idx === chosenStepIdx, 'previous-step': idx < chosenStepIdx }"
      v-for="(step, idx) in steps"
      :key="idx"
      @click="onStepClick(idx)"
    >
      <div
        class="flex flex-row justify-center items-end gap-x-2 lg:gap-x-4 text-neutral-700 group-[.previous-step]:text-neutral-200 group-[.active-step]:text-white group-hover:text-neutral-500"
      >
        <span class="hidden sm:block sm:text-4xl md:text-6xl lg:text-7xl">{{ idx + 1 }}</span>
        <span class="text-sm sm:text-base md:text-base md:pb-2.5 lg:text-lg lg:pb-3 text-nowrap">
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

<template>
  <menu class="m-auto flex w-full max-w-6xl flex-row gap-x-6 overflow-x-auto bg-black p-4">
    <li
      class="group flex w-full cursor-pointer select-none flex-col gap-y-1"
      v-for="(step, idx) in filenames"
      :key="idx"
      @click="onStepClick(idx)"
    >
      <div
        class="flex flex-row items-end justify-center gap-x-2 lg:gap-x-4"
        :class="[
          idx === chosenFilenameIdx
            ? 'text-white'
            : 'text-neutral-700 group-hover:text-neutral-500',
        ]"
      >
        <span class="text-nowrap text-base md:pb-2.5 lg:pb-3">
          {{ step }}
        </span>
      </div>
    </li>
  </menu>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

const emits = defineEmits<{
  change: [filename: string];
}>();

const filenames: Array<string> = [
  'RubikCubePiece.glb',
  'RubikTetrahedronPiece.glb',
  'RubikOctahedronPiece.glb',
  'RubikDodecahedronVertexPiece.glb',
  'RubikDodecahedronEdgePiece.glb',
  'RubikDodecahedronFacePiece.glb',
];
const chosenFilenameIdx: Ref<number> = ref<number>(0);

const onStepClick = (newIdx: number) => {
  chosenFilenameIdx.value = newIdx;
  emits('change', filenames[newIdx]);
};
</script>

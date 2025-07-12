<template>
  <div class="mx-auto flex flex-col gap-y-2 p-4 xs:gap-y-4">
    <h1 class="select-none text-xl tracking-tight text-white">Cube Type</h1>
    <Carousel
      v-model:page="temporaryCubeIndex"
      class="rounded-lg bg-gray-700"
      :value="getAllSelectableCubesNames"
      :num-visible="1"
      :num-scroll="1"
      :show-indicators="false"
      :pt="{
        itemList: 'h-full',
        content: '!align-stretch',
        pcPrevButton: {
          root: '!text-white hover:!text-gray-700 !rounded-r-none !rounded-l-lg !h-[108px] xs:!h-[144px] sm:!h-44',
        },
        pcNextButton: {
          root: '!text-white hover:!text-gray-700 !rounded-l-none !rounded-r-lg !h-[108px] xs:!h-[144px] sm:!h-44',
        },
      }"
      circular
    >
      <template #item="{ data }: { data: TCubeCommonNames }">
        <div class="flex h-full flex-col items-center justify-center py-2 xs:py-4">
          <component :is="cubesIcons[data]" class="size-16 xs:size-20 sm:size-28" />
          <span class="select-none text-xl text-white xs:text-2xl">{{ data }}</span>
        </div>
      </template>
    </Carousel>
    <BaseTransitionOpacity mode="out-in">
      <span class="h-[46px]" v-if="temporaryCubeIndex === undefined" />
      <Button
        v-else-if="currentCubeIndex !== temporaryCubeIndex"
        label="Select"
        @click="selectCube(temporaryCubeIndex)"
      />
      <div
        v-else
        class="flex h-[46px] select-none items-center justify-center text-xl font-bold text-white"
      >
        <span> Selected </span>
      </div>
    </BaseTransitionOpacity>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Component } from 'vue';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import BaseTransitionOpacity from '@/components/base/transition/base-transition-opacity.vue';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import BaseIcon2x2Cube from '@/components/base/icon/base-icon-2x2-cube.vue';
import BaseIcon3x3Cube from '@/components/base/icon/base-icon-3x3-cube.vue';
import BaseIcon4x4Cube from '@/components/base/icon/base-icon-4x4-cube.vue';
import BaseIcon5x5Cube from '@/components/base/icon/base-icon-5x5-cube.vue';
import BaseIconMegaminxCube from '@/components/base/icon/base-icon-megaminx-cube.vue';
import BaseIconPyraminxCube from '@/components/base/icon/base-icon-pyraminx-cube.vue';

const selectedCubeStore = useSelectedCubeStore();
const { getAllSelectableCubesNames, currentCubeIndex } = storeToRefs(selectedCubeStore);

const temporaryCubeIndex = ref<number>();

const cubesIcons: Record<TCubeCommonNames, Component> = {
  '2x2 Cube': BaseIcon2x2Cube,
  '3x3 Cube': BaseIcon3x3Cube,
  '4x4 Cube': BaseIcon4x4Cube,
  '5x5 Cube': BaseIcon5x5Cube,
  Megaminx: BaseIconMegaminxCube,
  Pyraminx: BaseIconPyraminxCube,
};

onMounted(() => {
  temporaryCubeIndex.value = currentCubeIndex.value;
});

const selectCube = (index: number) => {
  currentCubeIndex.value = index;
};
</script>

<template>
  <div
    @mousedown.stop
    @touchstart.stop
    class="flex justify-center gap-4 overflow-hidden rounded-lg bg-gray-800 p-4"
  >
    <div class="flex flex-col gap-y-2">
      <Carousel
        v-model:page="selectedMaterialIdx"
        class="h-14 w-48 rounded-lg bg-gray-700 sm:w-56"
        :value="cubeFacesMaterials"
        :num-visible="1"
        :num-scroll="1"
        :show-indicators="false"
        :pt="{
          itemList: 'h-full',
          content: '!align-stretch',
          pcPrevButton: {
            root: '!text-white hover:!text-gray-700 !rounded-r-none !rounded-l-lg !h-14',
          },
          pcNextButton: {
            root: '!text-white hover:!text-gray-700 !rounded-l-none !rounded-r-lg !h-14',
          },
        }"
        circular
        @update:page="updateSelectedMaterial"
      >
        <template #item="{ data: { material } }: { data: TCubeFaceMaterial }">
          <div class="flex h-full flex-col items-center justify-center py-2">
            <ColorPicker
              :model-value="material.color.getHexString()"
              :base-z-index="1005"
              format="hex"
              :pt="{ preview: { class: 'size-8' } }"
              @update:model-value="material.color.setStyle(`#${$event}`)"
            />
          </div>
        </template>
      </Carousel>
      <div class="flex items-center justify-between gap-x-2">
        <span class="text-white">Color</span>
        <ToggleButton
          :model-value="getIsColorCubeModeColorOn"
          class="group relative w-full px-2 py-1"
          :class="{
            'border-gray-500 bg-gray-800 text-white hover:!border-gray-600 hover:!bg-gray-700 hover:!text-white':
              !getIsColorCubeModeColorOn,
          }"
          @update:model-value="colorCubeModeStateStore.setIsColorCubeModeColorOn"
        >
          <template #default>
            <span>{{ getIsColorCubeModeColorOn ? 'On' : 'Off' }}</span>
          </template>
        </ToggleButton>
      </div>
    </div>
    <div class="flex flex-col">
      <Button class="size-8" @click="colorCubeModeStateStore.exitColorCubeMode">
        <BasePrimeIcon icon="pi-times" :size="20" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import ColorPicker from 'primevue/colorpicker';
import ToggleButton from 'primevue/togglebutton';
import Button from 'primevue/button';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';
import BasePrimeIcon from '@/components/base/icon/base-prime-icon.vue';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { computed, onMounted, ref } from 'vue';

const colorCubeModeStateStore = useColorCubeModeStore();
const { getIsColorCubeModeColorOn } = storeToRefs(colorCubeModeStateStore);
const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
const cubeFacesMaterials = computed<Array<TCubeFaceMaterial>>(() => {
  return Object.values(getCurrentCubeProperties.value?.piecesMaterials.cubeFacesMaterials ?? {});
});

const selectedMaterialIdx = ref<number>(0);
const updateSelectedMaterial = (): void => {
  colorCubeModeStateStore.setSelectedMaterial(cubeFacesMaterials.value[selectedMaterialIdx.value]);
};

onMounted(() => {
  updateSelectedMaterial();
});
</script>

<template>
  <div class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4">
    <h1 class="select-none text-xl tracking-tight text-white">Cube Colors</h1>
    <div class="flex flex-col gap-y-4">
      <div class="flex flex-wrap gap-y-4" v-if="cubeFacesMaterials.length > 0">
        <div v-for="({ material }, faceName) in cubeFacesMaterials" :key="faceName" class="px-2">
          <ColorPicker
            :model-value="material.color.getHexString()"
            :base-z-index="1005"
            format="hex"
            :pt="{ preview: { class: 'size-16' } }"
            @update:model-value="material.color.setStyle(`#${$event}`)"
          />
        </div>
      </div>
      <span v-else class="text-base tracking-tight text-white">No cube selected</span>
    </div>
    <Button
      label="Color The Cube"
      :pt="{ label: 'max-sm:text-lg text-xl font-bold' }"
      @click="colorCubeModeStateStore.enterColorCubeMode"
    />
  </div>
</template>

<script setup lang="ts">
import ColorPicker from 'primevue/colorpicker';
import Button from 'primevue/button';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { computed } from 'vue';

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
const cubeFacesMaterials = computed<Array<TCubeFaceMaterial>>(() => {
  return Object.values(getCurrentCubeProperties.value?.piecesMaterials.cubeFacesMaterials ?? {});
});

const colorCubeModeStateStore = useColorCubeModeStore();
</script>

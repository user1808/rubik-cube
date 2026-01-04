<template>
  <div
    class="flex items-stretch justify-center overflow-hidden rounded-lg bg-gray-800 max-sm:w-4/5 sm:flex-row"
  >
    <div
      class="flex flex-1 flex-row items-center justify-center gap-x-2 border-gray-700 px-5 py-1 text-center max-sm:order-last max-sm:hidden max-sm:border-t max-sm:py-0.5 sm:flex-col sm:border-r"
    >
      <BaseIcon3x3Cube class="size-16" />
      <span class="select-none text-sm font-bold leading-4 text-white"> Cube<br />Controls </span>
    </div>
    <div class="flex flex-col max-sm:w-full sm:flex-row">
      <div
        class="flex w-full flex-col gap-y-4 border-gray-700 px-4 py-3 sm:w-60 sm:border-r sm:py-2"
      >
        <Select :options="faces" placeholder="Select face" v-model="face">
          <template #option="{ option }: { option: string }">
            <span class="capitalize">{{ formatCamelCase(option) }}</span>
          </template>
          <template #value="{ value, placeholder }: { value: string; placeholder: string }">
            <span class="capitalize">{{ value ? formatCamelCase(value) : placeholder }}</span>
          </template>
        </Select>
        <Select :options="rotationTypes" placeholder="Select type" v-model="type">
          <template #option="{ option }: { option: string }">
            <span class="capitalize">{{ formatCamelCase(option) }}</span>
          </template>
          <template #value="{ value, placeholder }: { value: string; placeholder: string }">
            <span class="capitalize">{{ value ? formatCamelCase(value) : placeholder }}</span>
          </template>
        </Select>
      </div>
      <div class="flex items-center justify-center px-4 py-2">
        <Button
          class="group w-full text-xl sm:h-16 sm:w-28"
          label="Rotate"
          @click="handleRotateCube"
          :disabled="
            !isFaceAllowed || !isTypeAllowed || getIsRotationPending || getIsHistoryRotationPending
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { storeToRefs } from 'pinia';
import { useEventBus } from '@vueuse/core';
import BaseIcon3x3Cube from '@/components/base/icon/base-icon-3x3-cube.vue';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { useStringHelpers } from '@/composables/useStringHelpers';
import { useRotateCubeEventBus } from '@/event-buses/use-rotate-cube-event-bus';
import { useRotationFlagsStore } from '@/stores/use-rotation-flags-store';

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

const rotationFlagsStore = useRotationFlagsStore();
const { getIsRotationPending, getIsHistoryRotationPending } = storeToRefs(rotationFlagsStore);

const faces = computed<Array<string>>(() => {
  return [...(getCurrentCubeProperties.value?.rotationGroups ?? [])];
});
const rotationTypes = computed<Array<string>>(() => {
  return [...(getCurrentCubeProperties.value?.rotationTypesNames ?? [])];
});

const { formatCamelCase } = useStringHelpers();

const rotateCubeEventBus = useEventBus(useRotateCubeEventBus);

const face = ref<string>();
const type = ref<string>();

const isFaceAllowed = computed<boolean>(() => {
  return !!face.value && faces.value.includes(face.value);
});

const isTypeAllowed = computed<boolean>(() => {
  return !!type.value && rotationTypes.value.includes(type.value);
});

const handleRotateCube = () => {
  if (!isFaceAllowed.value || !isTypeAllowed.value || !face.value || !type.value) return;
  rotateCubeEventBus.emit({ face: face.value, type: type.value, source: 'interaction' });
};
</script>

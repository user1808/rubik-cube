import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { is2x2x2CubeSolvable } from '@/composables/algorithms/solvability/is-2x2x2-cube-solvable';
import { is3x3x3CubeSolvable } from '@/composables/algorithms/solvability/is-3x3x3-cube-solvable';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';

export const useIsCubeSolvable = () => {
  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const colorCubeModeStateStore = useColorCubeModeStore();
  const { getIsColorCubeModeOn } = storeToRefs(colorCubeModeStateStore);
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);

  const isCubeSolvableAlghorithms: Record<TCubeCommonNames, () => boolean> = {
    '2x2x2 Cube': is2x2x2CubeSolvable,
    '3x3x3 Cube': is3x3x3CubeSolvable,
    '4x4x4 Cube': () => true,
    '5x5x5 Cube': () => true,
    Megaminx: () => true,
    Pyraminx: () => true,
  };
  const isCubeSolvableCache = ref<Record<TCubeCommonNames, boolean>>({
    '2x2x2 Cube': true,
    '3x3x3 Cube': true,
    '4x4x4 Cube': true,
    '5x5x5 Cube': true,
    Megaminx: true,
    Pyraminx: true,
  });

  watch(
    () => getCurrentCubeProperties.value?.commonName,
    (cubeName) => {
      if (cubeName) {
        isCubeSolvableCache.value[cubeName] = isCubeSolvableAlghorithms[cubeName]();
      }
    },
    { immediate: true },
  );

  watch(
    [getIsColorCubeModeOn, getFacesLogicalValues],
    () => {
      const cubeName = getCurrentCubeProperties.value?.commonName;
      if (getIsColorCubeModeOn.value && cubeName) {
        isCubeSolvableCache.value[cubeName] = isCubeSolvableAlghorithms[cubeName]();
      }
    },
    { deep: true },
  );

  const isCubeSolvable = computed<boolean>(() => {
    const cubeName = getCurrentCubeProperties.value?.commonName;
    if (!cubeName) return false;
    return isCubeSolvableCache.value[cubeName];
  });

  return {
    isCubeSolvable,
  };
};

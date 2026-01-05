import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export const useIsCubeSolvable = () => {
  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

  const isCubeSolvableAlghorithms: Record<TCubeCommonNames, () => boolean> = {
    '2x2x2 Cube': () => true,
    '3x3x3 Cube': () => true,
    '4x4x4 Cube': () => true,
    '5x5x5 Cube': () => true,
    Megaminx: () => true,
    Pyraminx: () => true,
  };

  const isCubeSolvable = computed<boolean>(() => {
    const cubeName = getCurrentCubeProperties.value?.commonName;
    if (!cubeName) return false;

    return isCubeSolvableAlghorithms[cubeName]();
  });

  return {
    isCubeSolvable,
  };
};

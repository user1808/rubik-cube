import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export const useIsCubeSolvable = () => {
  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);

  const isCubeSolvableAlghorithms: Record<
    TCubeCommonNames,
    (logicalValues: Record<string, Array<Nullable<TCubeFaceColor>>>) => boolean
  > = {
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

    const facesLogicalValues = getFacesLogicalValues.value[cubeName];
    if (!facesLogicalValues) return false;

    console.log(facesLogicalValues);

    return isCubeSolvableAlghorithms[cubeName](facesLogicalValues);
  });

  return {
    isCubeSolvable,
  };
};

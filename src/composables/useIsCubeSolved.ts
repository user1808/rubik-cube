import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export const useIsCubeSolved = () => {
  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const facesLogicalValuesStore = useFacesLogicalValuesStore();
  const { getFacesLogicalValues } = storeToRefs(facesLogicalValuesStore);

  const isCubeSolved = computed<boolean>(() => {
    const cubeName = getCurrentCubeProperties.value?.commonName;
    if (!cubeName) return false;

    const facesLogicalValues = getFacesLogicalValues.value[cubeName];

    if (!facesLogicalValues) return false;

    const uniqueFaceValues = new Set<TCubeFaceColor>();
    for (const faceValues of Object.values(facesLogicalValues)) {
      if (!faceValues || faceValues.length === 0) return false;

      const firstValue = faceValues[0];
      if (firstValue === null) return false;
      if (!faceValues.every((value) => value === firstValue)) return false;
      uniqueFaceValues.add(firstValue);
    }

    if (uniqueFaceValues.size !== Object.keys(facesLogicalValues).length) return false;

    return true;
  });

  return {
    isCubeSolved,
  };
};

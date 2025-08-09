import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useSelectedCubeStore } from './use-selected-cube-store';

const useFacesLogicalValuesPrivateState = defineStore('faces-logical-values-private', () => {
  const facesLogicalValues = ref<
    Record<TCubeCommonNames, Nullable<Record<string, Array<Nullable<TCubeFaceColor>>>>>
  >({
    '2x2x2 Cube': null,
    '3x3x3 Cube': null,
    '4x4x4 Cube': null,
    '5x5x5 Cube': null,
    Megaminx: null,
    Pyraminx: null,
  });

  return {
    facesLogicalValues,
  };
});

export const useFacesLogicalValuesStore = defineStore('faces-logical-values', () => {
  const privateState = useFacesLogicalValuesPrivateState();
  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

  const getFacesLogicalValues = computed<
    Record<TCubeCommonNames, Nullable<Record<string, Array<Nullable<TCubeFaceColor>>>>>
  >(() => {
    return privateState.facesLogicalValues;
  });

  const setFacesLogicalValues = (
    cubeCommonName: TCubeCommonNames,
    facesLogicalValues: Record<string, Array<Nullable<TCubeFaceColor>>>,
  ) => {
    privateState.facesLogicalValues[cubeCommonName] = facesLogicalValues;
  };

  const isCubeSolved = computed<boolean>(() => {
    const currentCubeName = getCurrentCubeProperties.value?.commonName;

    if (!currentCubeName) return false;

    const currentFacesLogicalValues = getFacesLogicalValues.value[currentCubeName];

    if (!currentFacesLogicalValues) return false;

    const uniqueFaceValues = new Set<TCubeFaceColor>();
    for (const faceValues of Object.values(currentFacesLogicalValues)) {
      if (!faceValues || faceValues.length === 0) return false;

      const firstValue = faceValues[0];
      if (firstValue === null) return false;
      if (!faceValues.every((value) => value === firstValue)) return false;
      uniqueFaceValues.add(firstValue);
    }

    if (uniqueFaceValues.size !== Object.keys(currentFacesLogicalValues).length) return false;

    return true;
  });

  return {
    getFacesLogicalValues,
    setFacesLogicalValues,
    isCubeSolved,
  };
});

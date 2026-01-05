import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { TCubeFaceColor } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

  return {
    getFacesLogicalValues,
    setFacesLogicalValues,
  };
});

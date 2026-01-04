import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useCubeRotationTimesPrivateState = defineStore(
  'cube-rotation-times-private',
  () => {
    const DEFAULT_ROTATION_TIME = 1;

    const isGlobal = ref<boolean>(false);
    const cubeRotationTimes = ref<Record<TCubeCommonNames, number>>({
      '2x2x2 Cube': DEFAULT_ROTATION_TIME,
      '3x3x3 Cube': DEFAULT_ROTATION_TIME,
      '4x4x4 Cube': DEFAULT_ROTATION_TIME,
      '5x5x5 Cube': DEFAULT_ROTATION_TIME,
      Megaminx: DEFAULT_ROTATION_TIME,
      Pyraminx: DEFAULT_ROTATION_TIME,
    });

    return {
      DEFAULT_ROTATION_TIME,
      isGlobal,
      cubeRotationTimes,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isGlobal', 'cubeRotationTimes'],
    },
  },
);

export const useCubeRotationTimesStore = defineStore('cube-rotation-times', () => {
  const privateState = useCubeRotationTimesPrivateState();

  const getDefaultRotationTime = computed<number>(() => {
    return privateState.DEFAULT_ROTATION_TIME;
  });

  const getIsGlobal = computed<boolean>(() => {
    return privateState.isGlobal;
  });

  const getCubeRotationTimes = computed<Record<TCubeCommonNames, number>>(() => {
    return privateState.cubeRotationTimes;
  });

  const applyTimeToAllCubes = (value: number): void => {
    const cubeNames = Object.keys(privateState.cubeRotationTimes) as Array<
      keyof typeof privateState.cubeRotationTimes
    >;
    for (const cubeName of cubeNames) {
      privateState.cubeRotationTimes[cubeName] = value;
    }
  };

  const toggleIsGlobal = (currentCubeName: TCubeCommonNames): void => {
    privateState.isGlobal = !privateState.isGlobal;
    if (privateState.isGlobal) {
      applyTimeToAllCubes(getCubeRotationTimes.value[currentCubeName]);
    }
  };

  const setCubeRotationTime = (currentCubeName: TCubeCommonNames, value: number): void => {
    if (privateState.isGlobal) {
      applyTimeToAllCubes(value);
    } else {
      privateState.cubeRotationTimes[currentCubeName] = value;
    }
  };

  return {
    getDefaultRotationTime,
    getIsGlobal,
    getCubeRotationTimes,
    toggleIsGlobal,
    setCubeRotationTime,
  };
});

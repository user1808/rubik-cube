import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type TDistanceState = 'far' | 'medium' | 'close';

const useOrbitControlsDataPrivateState = defineStore('orbit-controls-data-private', () => {
  const maxDistance = ref(Infinity);
  const distance = ref(Infinity);

  return {
    maxDistance,
    distance,
  };
});

export const useOrbitControlsDataStore = defineStore('orbit-controls-data', () => {
  const privateState = useOrbitControlsDataPrivateState();

  const getDistanceState = computed<TDistanceState>(() => {
    if (privateState.distance > privateState.maxDistance * 0.75) {
      return 'far';
    } else if (privateState.distance < privateState.maxDistance * 0.5) {
      return 'close';
    } else {
      return 'medium';
    }
  });

  const setMaxDistance = (maxDistance: number) => {
    privateState.maxDistance = maxDistance;
  };
  const setDistance = (distance: number) => {
    privateState.distance = distance;
  };

  return {
    getDistanceState,
    setMaxDistance,
    setDistance,
  };
});

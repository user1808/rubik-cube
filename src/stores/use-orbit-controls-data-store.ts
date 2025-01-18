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

  const init = (maxDistance: number, currentDistance: number) => {
    privateState.maxDistance = maxDistance;
    privateState.distance = currentDistance;
  };

  const setDistance = (distance: number) => {
    privateState.distance = distance;
  };

  const getDistanceState = computed<TDistanceState>(() => {
    if (privateState.distance > privateState.maxDistance * 0.75) {
      return 'far';
    } else if (privateState.distance < privateState.maxDistance * 0.5) {
      return 'close';
    } else {
      return 'medium';
    }
  });

  return {
    init,
    setDistance,
    getDistanceState,
  };
});

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useRotationFlagsPrivateState = defineStore('rotation-flags-private', () => {
  const isHistoryRotationPending = ref<boolean>(false);
  const isRotationPending = ref<boolean>(false);

  return {
    isHistoryRotationPending,
    isRotationPending,
  };
});

export const useRotationFlagsStore = defineStore('rotation-flags', () => {
  const privateState = useRotationFlagsPrivateState();

  const getIsRotationPending = computed<boolean>(() => {
    return privateState.isRotationPending;
  });

  const getIsHistoryRotationPending = computed<boolean>(() => {
    return privateState.isHistoryRotationPending;
  });

  const setIsRotationPending = (value: boolean): void => {
    privateState.isRotationPending = value;
  };

  const setIsHistoryRotationPending = (value: boolean): void => {
    privateState.isHistoryRotationPending = value;
  };

  return {
    getIsRotationPending,
    getIsHistoryRotationPending,
    setIsRotationPending,
    setIsHistoryRotationPending,
  };
});

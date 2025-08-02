import { useFacesHelperEventBus } from '@/event-buses/use-faces-helper-event-bus';
import { useEventBus } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useFacesHelperPrivateState = defineStore(
  'faces-helper-private',
  () => {
    const isShowFacesHelperToggleVisible = ref<boolean>(false);
    const isFacesHelperVisible = ref<boolean>(false);

    return {
      isShowFacesHelperToggleVisible,
      isFacesHelperVisible,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isShowFacesHelperToggleVisible', 'isFacesHelperVisible'],
    },
  },
);

export const useFacesHelperStore = defineStore('faces-helper', () => {
  const privateState = useFacesHelperPrivateState();
  const facesHelperEventBus = useEventBus(useFacesHelperEventBus);

  const getIsShowFacesHelperToggleVisible = computed<boolean>(() => {
    return privateState.isShowFacesHelperToggleVisible;
  });
  const getIsFacesHelperVisible = computed<boolean>(() => {
    return privateState.isFacesHelperVisible;
  });

  const setIsShowFacesHelperToggleVisible = (newValue: boolean): void => {
    privateState.isShowFacesHelperToggleVisible = newValue;
    if (newValue === false) {
      setIsFacesHelperVisible(false);
    }
  };
  const setIsFacesHelperVisible = (newValue: boolean): void => {
    const previousValue = privateState.isFacesHelperVisible;
    privateState.isFacesHelperVisible = newValue;
    if (previousValue !== newValue) {
      facesHelperEventBus.emit('update-faces-helper-visibility');
    }
  };

  return {
    getIsShowFacesHelperToggleVisible,
    getIsFacesHelperVisible,
    setIsShowFacesHelperToggleVisible,
    setIsFacesHelperVisible,
  };
});

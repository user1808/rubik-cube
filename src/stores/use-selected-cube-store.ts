import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { IRubikCubeProperties } from '@/rubik-cube-app/rubik-cube/interfaces/structure/cube/rubik-cube';
import { useUpdateCubePropertiesEventBus } from '@/event-buses/use-update-cube-properties-event-bus';
import { useEventBus } from '@vueuse/core';

const useSelectedCubePrivateState = defineStore(
  'selected-cube-private',
  () => {
    const selectedCubeProperties = ref<IRubikCubeProperties | undefined>();

    return {
      selectedCubeProperties,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['selectedCubeProperties'],
    },
  },
);

export const useSelectedCubeStore = defineStore('selected-cube', () => {
  const privateState = useSelectedCubePrivateState();
  const updateCubePropertiesEventBus = useEventBus(useUpdateCubePropertiesEventBus);

  const getCurrentCubeProperties = computed<IRubikCubeProperties | undefined>(() => {
    return privateState.selectedCubeProperties;
  });

  const setCurrentCubeProperties = (properties: IRubikCubeProperties) => {
    privateState.selectedCubeProperties = properties;
    updateCubePropertiesEventBus.emit('update-cube-properties');
  };

  return {
    getCurrentCubeProperties,
    setCurrentCubeProperties,
  };
});

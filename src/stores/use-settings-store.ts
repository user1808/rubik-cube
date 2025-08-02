import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useSettingsPrivateState = defineStore(
  'settings-private',
  () => {
    const isSettingsOpen = ref<boolean>(false);
    const isSettingsMinimized = ref<boolean>(false);

    return {
      isSettingsOpen,
      isSettingsMinimized,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isSettingsMinimized'],
    },
  },
);

export const useSettingsStore = defineStore('settings', () => {
  const privateState = useSettingsPrivateState();

  const getIsSettingsOpen = computed<boolean>(() => {
    return privateState.isSettingsOpen;
  });

  const getIsSettingsMinimized = computed<boolean>(() => {
    return privateState.isSettingsMinimized;
  });

  const setIsSettingsOpen = (isOpen: boolean): void => {
    privateState.isSettingsOpen = isOpen;
  };

  const setIsSettingsMinimized = (isMinimized: boolean): void => {
    privateState.isSettingsMinimized = isMinimized;
  };

  return {
    getIsSettingsOpen,
    getIsSettingsMinimized,
    setIsSettingsOpen,
    setIsSettingsMinimized,
  };
});

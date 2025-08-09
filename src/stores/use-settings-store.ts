import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useSettingsPrivateState = defineStore(
  'settings-private',
  () => {
    const isSettingsOpen = ref<boolean>(false);
    const isSettingsMinimized = ref<boolean>(false);
    const isSettingsSideDrawerSectionsTitlesAlwaysHidden = ref<boolean>(false);

    return {
      isSettingsOpen,
      isSettingsMinimized,
      isSettingsSideDrawerSectionsTitlesAlwaysHidden,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['isSettingsMinimized', 'isSettingsSideDrawerSectionsTitlesAlwaysHidden'],
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

  const getIsSettingsSideDrawerSectionsTitlesAlwaysHidden = computed<boolean>(() => {
    return privateState.isSettingsSideDrawerSectionsTitlesAlwaysHidden;
  });

  const setIsSettingsOpen = (isOpen: boolean): void => {
    privateState.isSettingsOpen = isOpen;
  };

  const setIsSettingsMinimized = (isMinimized: boolean): void => {
    privateState.isSettingsMinimized = isMinimized;
  };

  const setIsSettingsSideDrawerSectionsTitlesAlwaysHidden = (isAlwaysHidden: boolean): void => {
    privateState.isSettingsSideDrawerSectionsTitlesAlwaysHidden = isAlwaysHidden;
  };

  return {
    getIsSettingsOpen,
    getIsSettingsMinimized,
    getIsSettingsSideDrawerSectionsTitlesAlwaysHidden,
    setIsSettingsOpen,
    setIsSettingsMinimized,
    setIsSettingsSideDrawerSectionsTitlesAlwaysHidden,
  };
});

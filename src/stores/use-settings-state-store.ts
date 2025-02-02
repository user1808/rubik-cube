import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStateStore = defineStore('settings-state', () => {
  const isSettingsOpen = ref<boolean>(false);
  const isSettingsMinimized = ref<boolean>(false);

  return {
    isSettingsOpen,
    isSettingsMinimized,
  };
});

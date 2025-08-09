import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingsStore } from './use-settings-store';
import { useSettingsWindowStore } from './use-settings-window-store';
import { useLocalStorage, usePointer } from '@vueuse/core';

export const useCursorStateStore = defineStore('cursor-state', () => {
  const settingsStateStore = useSettingsStore();
  const { getIsSettingsOpen, getIsSettingsMinimized } = storeToRefs(settingsStateStore);

  const settingsWindowStore = useSettingsWindowStore();
  const { getWindowSize } = storeToRefs(settingsWindowStore);

  const windowPosition = useLocalStorage<{ x: number | undefined; y: number | undefined }>(
    settingsWindowStore.POSITION_STORAGE_KEY,
    {
      x: undefined,
      y: undefined,
    },
  );

  const pointerPosition = usePointer();

  const getIsCursorOverSettings = computed<boolean>(() => {
    const isSettingsOpen = getIsSettingsOpen.value;
    const isSettingsMinimized = getIsSettingsMinimized.value;

    if (!isSettingsOpen) return false;
    if (!isSettingsMinimized) return true;

    const windowWidth = getWindowSize.value.width;
    const windowHeight = getWindowSize.value.height;
    const windowX = windowPosition.value.x;
    const windowY = windowPosition.value.y;

    if (!windowX || !windowY) return false;

    const pointerX = pointerPosition.x.value;
    const pointerY = pointerPosition.y.value;

    return (
      pointerX >= windowX &&
      pointerX <= windowX + windowWidth &&
      pointerY >= windowY &&
      pointerY <= windowY + windowHeight
    );
  });

  return {
    getIsCursorOverSettings,
  };
});

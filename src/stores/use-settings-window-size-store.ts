import type { ElementSize } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const { width: browserWidth, height: browserHeight } = useWindowSize();

const useSettingsWindowSizePrivateStore = defineStore(
  'settings-window-size-private',
  () => {
    const width = ref(Math.floor((9 / 20) * browserWidth.value));
    const height = ref(Math.floor((4 / 5) * browserHeight.value));

    return {
      width,
      height,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['width', 'height'],
    },
  },
);

export const useSettingsWindowSizeStore = defineStore('settings-window-size', () => {
  const privateState = useSettingsWindowSizePrivateStore();

  const getWindowSize = computed<ElementSize>(() => ({
    width: privateState.width,
    height: privateState.height,
  }));

  const setWindowSize = (newSize: ElementSize) => {
    privateState.width = newSize.width;
    privateState.height = newSize.height;
  };

  return {
    getWindowSize,
    setWindowSize,
  };
});

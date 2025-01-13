import type { ElementSize } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();

export const useSettingsWindowSizeStore = defineStore(
  'settings-window-size',
  () => {
    const width = ref(Math.floor((9 / 20) * windowWidth.value));
    const height = ref(Math.floor((4 / 5) * windowHeight.value));

    const updateSize = (newSize: ElementSize) => {
      width.value = newSize.width;
      height.value = newSize.height;
    };

    return {
      width,
      height,
      updateSize,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['width', 'height'],
    },
  },
);

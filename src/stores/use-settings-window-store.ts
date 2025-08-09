import type { ElementSize } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type BaseSettingsDraggableWindowBorders = 'top' | 'right' | 'bottom' | 'left';

const { width: browserWidth, height: browserHeight } = useWindowSize();

const useSettingsWindowPrivateState = defineStore(
  'settings-window-private',
  () => {
    const POSITION_STORAGE_KEY = 'settings-window-position';

    const width = ref<number>(Math.floor((9 / 20) * browserWidth.value));
    const height = ref<number>(Math.floor((4 / 5) * browserHeight.value));

    const bordersVisibility = ref<Record<BaseSettingsDraggableWindowBorders, boolean>>({
      top: true,
      right: true,
      bottom: true,
      left: true,
    });

    return {
      POSITION_STORAGE_KEY,
      width,
      height,
      bordersVisibility,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['width', 'height'],
    },
  },
);

export const useSettingsWindowStore = defineStore('settings-window', () => {
  const privateState = useSettingsWindowPrivateState();

  const getWindowSize = computed<ElementSize>(() => ({
    width: privateState.width,
    height: privateState.height,
  }));

  const setWindowSize = (newSize: ElementSize): void => {
    privateState.width = newSize.width;
    privateState.height = newSize.height;
  };

  const getBordersVisibility = computed<Record<BaseSettingsDraggableWindowBorders, boolean>>(
    () => privateState.bordersVisibility,
  );

  const setBorderVisibility = (
    border: BaseSettingsDraggableWindowBorders,
    state: boolean,
  ): void => {
    privateState.bordersVisibility[border] = state;
  };

  const isAnyBorderHidden = computed<boolean>(() =>
    Object.values(privateState.bordersVisibility).some((value) => !value),
  );

  return {
    POSITION_STORAGE_KEY: privateState.POSITION_STORAGE_KEY,
    getWindowSize,
    setWindowSize,
    getBordersVisibility,
    setBorderVisibility,
    isAnyBorderHidden,
  };
});

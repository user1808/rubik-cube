import type { ElementSize } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type BaseSettingsDraggableWindowBorders = 'top' | 'right' | 'bottom' | 'left';

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

const useSettingsWindowBordersVisibilityPrivateStore = defineStore(
  'settings-window-borders-visibility-private',
  () => {
    const bordersVisibility = ref<Record<BaseSettingsDraggableWindowBorders, boolean>>({
      top: true,
      right: true,
      bottom: true,
      left: true,
    });

    return {
      bordersVisibility,
    };
  },
);

export const useSettingsWindowDataStore = defineStore('settings-window-size', () => {
  const privateSizeState = useSettingsWindowSizePrivateStore();
  const privateBordersVisibilityState = useSettingsWindowBordersVisibilityPrivateStore();

  const getWindowSize = computed<ElementSize>(() => ({
    width: privateSizeState.width,
    height: privateSizeState.height,
  }));

  const setWindowSize = (newSize: ElementSize) => {
    privateSizeState.width = newSize.width;
    privateSizeState.height = newSize.height;
  };

  const getBordersVisibility = computed<Record<BaseSettingsDraggableWindowBorders, boolean>>(
    () => privateBordersVisibilityState.bordersVisibility,
  );

  const setBorderVisibility = (border: BaseSettingsDraggableWindowBorders, state: boolean) => {
    privateBordersVisibilityState.bordersVisibility[border] = state;
  };

  const isAnyBorderHidden = computed<boolean>(() =>
    Object.values(privateBordersVisibilityState.bordersVisibility).some((value) => !value),
  );

  return {
    getWindowSize,
    setWindowSize,
    getBordersVisibility,
    setBorderVisibility,
    isAnyBorderHidden,
  };
});

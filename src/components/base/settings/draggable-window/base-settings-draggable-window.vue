<template>
  <BaseTransitionOpacity>
    <BaseSettingsDraggableWindowReset
      v-if="open && minimized && isAnyBorderHidden && !isResetWindowPending"
      :borders-visibility="bordersVisibility"
      @reset-window-size="resetWindow"
    />
  </BaseTransitionOpacity>
  <BaseTransitionOpacity>
    <UseDraggable
      ref="window"
      v-if="selectedSection && open && minimized"
      class="fixed z-40 flex max-h-[85%] max-w-[75%] select-none resize overflow-hidden rounded-md bg-black/75 outline outline-1 outline-gray-700"
      :prevent-default="true"
      :handle="handle"
      :storage-key="POSITION_STORAGE_KEY"
      storage-type="session"
      @end="onDragEnd"
      @mousemove.stop
      @mousedown.stop
      @touchmove.stop
      @touchstart.stop
      v-resize-observer="onResize"
      v-element-visibility="onWindowVisibility"
    >
      <div class="relative flex size-full flex-col">
        <div
          class="absolute inset-x-0 bottom-0 h-0.5 w-full"
          v-element-visibility="(state) => onBordersVisibility('bottom', state)"
        />
        <div
          class="absolute inset-y-0 right-0 h-full w-0.5"
          v-element-visibility="(state) => onBordersVisibility('right', state)"
        />
        <div
          class="absolute inset-x-0 top-0 h-0.5 w-full"
          v-element-visibility="(state) => onBordersVisibility('top', state)"
        />
        <div
          class="absolute inset-y-0 left-0 h-full w-0.5"
          v-element-visibility="(state) => onBordersVisibility('left', state)"
        />
        <div
          ref="handle"
          class="flex cursor-move flex-row items-center justify-between gap-x-4 bg-gray-800 p-2 text-white"
          :style="{ height: `${HANDLE_HEIGHT}px` }"
        >
          <slot name="header">
            <div class="flex select-none items-center gap-x-2">
              <component
                v-if="selectedSection.icon"
                :is="selectedSection.icon"
                v-bind="selectedSection.iconBind"
              />
              <span
                class="line-clamp-1 text-2xl font-bold leading-tight tracking-tight [word-spacing:-0.5rem]"
              >
                {{ selectedSection.title }}
              </span>
            </div>
            <div class="flex min-w-fit items-center">
              <BasePrimeIcon
                icon="pi-window-maximize"
                class="mx-2.5 -rotate-90 cursor-pointer py-2.5 hover:opacity-75"
                :size="28"
                @click="maximize"
              />
              <BasePrimeIcon
                icon="pi-times"
                class="cursor-pointer py-2 pl-2.5 pr-3 hover:opacity-75"
                :size="36"
                @click="switchOpen"
              />
            </div>
          </slot>
        </div>
        <div class="flex grow justify-between overflow-y-auto">
          <div class="flex grow overflow-y-auto">
            <slot name="content" />
          </div>
          <BaseSettingsSections
            v-model:selected-section="selectedSection"
            @update:selected-section="resetWindow()"
            :sections="sections"
            :height="SECTION_HEIGHT"
          />
        </div>
      </div>
    </UseDraggable>
  </BaseTransitionOpacity>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import debounce from 'lodash.debounce';
import { UseDraggable, vElementVisibility, vResizeObserver } from '@vueuse/components';
import { useSessionStorage, useWindowSize } from '@vueuse/core';
import { useStyleHelpers } from '@/composables/useStyleHelpers';
import { useSettingsWindowSizeStore } from '@/stores/use-settings-window-size-store';
import type { BaseSettingsDraggableWindowBorders } from './base-settings-draggable-window-borders.type';
import type { BaseSettingsSection } from '../base-settings-section.type';
import type { ElementSize, ResizeObserverEntry } from '@vueuse/core';
import BasePrimeIcon from '../../icon/base-prime-icon.vue';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';
import BaseSettingsSections from '../base-settings-sections.vue';

const BaseSettingsDraggableWindowReset = defineAsyncComponent(
  () => import('./base-settings-draggable-window-reset.vue'),
);

const selectedSection = defineModel<BaseSettingsSection>('selectedSection');
const open = defineModel<boolean>('open', { default: false });
const minimized = defineModel<boolean>('minimized', { default: false });

type BaseSettingsDraggableWindowProps = {
  sections: Array<BaseSettingsSection>;
};
const props = defineProps<BaseSettingsDraggableWindowProps>();

const MIN_WIDTH = 475;
const HANDLE_HEIGHT = 72;
const SECTION_HEIGHT = 72;
const MARGIN_HEIGHT = 16;
const MIN_HEIGHT = HANDLE_HEIGHT + props.sections.length * SECTION_HEIGHT + MARGIN_HEIGHT;
const POSITION_STORAGE_KEY = 'settings-window-position';

const { applyStyles } = useStyleHelpers();

const settingsWindowSizeStore = useSettingsWindowSizeStore();
const { getWindowSize } = storeToRefs(settingsWindowSizeStore);
const { setWindowSize } = settingsWindowSizeStore;

const { width: browserWidth, height: browserHeight } = useWindowSize();
const windowPosition = useSessionStorage(
  POSITION_STORAGE_KEY,
  { x: 10, y: 10 },
  { initOnMounted: true },
);

const window = useTemplateRef('window');
const handle = useTemplateRef<HTMLElement>('handle');

const isWindowVisible = ref<boolean>(false);
const onWindowVisibility = (state: boolean) => (isWindowVisible.value = state);
const onDragEnd = () => {
  if (!isWindowVisible.value) switchOpen();
};

const switchOpen = () => (open.value = !open.value);
const maximize = () => (minimized.value = false);

const bordersVisibility = ref<Record<BaseSettingsDraggableWindowBorders, boolean>>({
  top: true,
  right: true,
  bottom: true,
  left: true,
});
const onBordersVisibility = (border: BaseSettingsDraggableWindowBorders, state: boolean) =>
  (bordersVisibility.value[border] = state);
const isAnyBorderHidden = computed<boolean>(() =>
  Object.values(bordersVisibility.value).some((value) => !value),
);

const setInitSizeDataFlag = ref<boolean>(true);
const onResize = (entries: ReadonlyArray<ResizeObserverEntry>) => {
  if (entries.length === 0) return;
  const entry = entries[0];
  const target = entry.target as HTMLElement;

  if (setInitSizeDataFlag.value) {
    applyStyles(target, {
      width: `${getWindowSize.value.width}px`,
      height: `${getWindowSize.value.height}px`,
      minHeight: `${MIN_HEIGHT}px`,
      minWidth: `${MIN_WIDTH}px`,
    });
    setInitSizeDataFlag.value = false;
    return;
  }

  if (entry.contentRect.width <= 0 || entry.contentRect.height <= 0) {
    setInitSizeDataFlag.value = true;
    if (isWindowVisible.value) {
      windowPosition.value.x = target.style.left ? parseFloat(target.style.left) : 0;
      windowPosition.value.y = target.style.top ? parseFloat(target.style.top) : 0;
    }
    return;
  }

  setWindowSize(entry.contentRect);
};

const isResetWindowPending = ref<boolean>(false);
const resetWindow = async () => {
  const draggableElement = window.value?.$el as HTMLElement;
  if (!draggableElement) return;
  isResetWindowPending.value = true;
  const size: ElementSize = {
    width: getWindowSize.value.width,
    height: getWindowSize.value.height,
  };
  if (!bordersVisibility.value.right) {
    size.width = Math.max(browserWidth.value - windowPosition.value.x, MIN_WIDTH);
    windowPosition.value.x = browserWidth.value - size.width;
  }
  if (!bordersVisibility.value.left) {
    size.width = Math.max(windowPosition.value.x + getWindowSize.value.width, MIN_WIDTH);
    windowPosition.value.x = 0;
  }
  if (!bordersVisibility.value.bottom) {
    size.height = Math.max(browserHeight.value - windowPosition.value.y, MIN_HEIGHT);
    windowPosition.value.y = browserHeight.value - size.height;
  }
  if (!bordersVisibility.value.top) {
    size.height = Math.max(windowPosition.value.y + getWindowSize.value.height, MIN_HEIGHT);
    windowPosition.value.y = 0;
  }
  setWindowSize(size);
  applyStyles(draggableElement, {
    width: `${size.width}px`,
    height: `${size.height}px`,
    left: `${windowPosition.value.x}px`,
    top: `${windowPosition.value.y}px`,
  });
  debounce(() => (isResetWindowPending.value = false), 20)();
};
</script>

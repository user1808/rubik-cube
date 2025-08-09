<template>
  <div class="relative flex max-h-full w-full flex-col px-4 pb-4">
    <h1 class="select-none text-nowrap py-4 text-xl tracking-tight text-white">
      Moves History For {{ currentCubeName ?? 'No cube selected' }}
    </h1>
    <div
      ref="listRef"
      class="relative flex max-h-full flex-col divide-y divide-gray-600 overflow-y-auto rounded-lg bg-gray-700"
    >
      <SettingsMovesHistoryPoint
        v-for="(move, index) in cubeMovesHistory"
        :key="index"
        ref="pointRefs"
        :move="move"
        :index="index - START_ARRAY_OFFSET"
        :target-move="getTargetMove"
        :height="POINT_HEIGHT_PX"
        @click="onMoveClick"
      />
      <span
        :style="indicatorStyle"
        class="pointer-events-none absolute right-2 size-3 rounded-full border border-white bg-white shadow transition-all ease-linear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch, nextTick, type StyleValue } from 'vue';
import SettingsMovesHistoryPoint from './settings-moves-history-point.vue';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { useCubeMovesHistoryStore } from '@/stores/use-cube-moves-history-store';
import { useCubeRotationTimesStore } from '@/stores/use-cube-rotation-times-store';
import { useRotationFlagsStore } from '@/stores/use-rotation-flags-store';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';

const POINT_HEIGHT_PX = 68;
const START_ARRAY_OFFSET = 1;
const INDICATOR_SIZE_PX = 12;
const INDICATOR_HALF_SIZE_PX = INDICATOR_SIZE_PX / 2;

const selectedCubeStore = useSelectedCubeStore();
const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);

const cubeMovesHistoryStore = useCubeMovesHistoryStore();
const { getCubeMovesHistory, getCurrentMove, getTargetMove } = storeToRefs(cubeMovesHistoryStore);

const cubeRotationTimesStore = useCubeRotationTimesStore();
const { getCubeRotationTimes } = storeToRefs(cubeRotationTimesStore);

const rotationFlagsStore = useRotationFlagsStore();

const listRef = ref<HTMLDivElement | null>(null);
const pointRefs = ref<InstanceType<typeof SettingsMovesHistoryPoint>[]>([]);

const indicatorTop = ref<number>(
  (2 * getCurrentMove.value + 3 * START_ARRAY_OFFSET) * (POINT_HEIGHT_PX / 2) -
    INDICATOR_HALF_SIZE_PX,
);

const currentCubeName = computed<TCubeCommonNames | undefined>(() => {
  return getCurrentCubeProperties.value?.commonName;
});

const cubeMovesHistory = computed(() => {
  const cubeName = getCurrentCubeProperties.value?.commonName;
  if (!cubeName) return [];
  return [{ notation: 'Start' }, ...getCubeMovesHistory.value[cubeName]];
});

const indicatorStyle = computed<StyleValue>(() => {
  const cubeName = getCurrentCubeProperties.value?.commonName;
  return {
    top: `${indicatorTop.value}px`,
    width: `${INDICATOR_SIZE_PX}px`,
    height: `${INDICATOR_SIZE_PX}px`,
    transitionDuration: `${cubeName ? getCubeRotationTimes.value[cubeName] : 0}s`,
  };
});

const onMoveClick = (index: number) => {
  if (getTargetMove.value === index || !currentCubeName.value) return;
  rotationFlagsStore.setIsHistoryRotationPending(true);
  cubeMovesHistoryStore.setTargetMove(currentCubeName.value, index);
};

const getElementPosition = (moveIndex: number): number | null => {
  const arrayIndex = moveIndex + START_ARRAY_OFFSET;
  const point = pointRefs.value[arrayIndex];
  if (!point || !point.$el || !listRef.value) return null;

  const pointElement = point.$el as HTMLElement;

  // Calculate position relative to scroll container, not viewport
  const pointOffsetTop = pointElement.offsetTop;
  const pointCenterOffset = pointElement.offsetHeight / 2;

  return pointOffsetTop + pointCenterOffset - INDICATOR_HALF_SIZE_PX;
};

const scrollToMove = async (moveIndex: number) => {
  await nextTick();

  const arrayIndex = moveIndex + START_ARRAY_OFFSET;
  const point = pointRefs.value[arrayIndex];
  if (!point || !point.$el || !listRef.value) return;

  const pointElement = point.$el as HTMLElement;
  const listElement = listRef.value;

  // Calculate the position to scroll to (center the element in the visible area)
  const pointOffsetTop = pointElement.offsetTop;
  const pointHeight = pointElement.offsetHeight;
  const listHeight = listElement.clientHeight;
  const scrollPosition = pointOffsetTop + pointHeight / 2 - listHeight / 2;

  listElement.scrollTo({
    top: Math.max(0, scrollPosition),
    behavior: 'smooth',
  });
};

const updateIndicatorPosition = async () => {
  await nextTick();

  const newPosition = getElementPosition(getCurrentMove.value);
  if (newPosition !== null && newPosition !== indicatorTop.value) {
    indicatorTop.value = newPosition;
  }
};

watch(getCurrentMove, updateIndicatorPosition, {
  immediate: true,
});

watch(
  getTargetMove,
  (newTargetMove) => {
    scrollToMove(newTargetMove);
  },
  {
    immediate: true,
  },
);
</script>

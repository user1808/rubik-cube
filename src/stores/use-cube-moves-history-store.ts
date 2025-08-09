import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { TCubeMovesHistoryLog } from '@/rubik-cube-app/rubik-cube/types/cube-moves-history-log';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, watch, type WatchHandle } from 'vue';
import { useEventBus } from '@vueuse/core';
import { useCubeRotationTimesStore } from '@/stores/use-cube-rotation-times-store';
import { useSelectedCubeStore } from '@/stores/use-selected-cube-store';
import { useRotationFlagsStore } from './use-rotation-flags-store';
import { useRotateCubeEventBus } from '@/event-buses/use-rotate-cube-event-bus';

const useCubeMovesHistoryPrivateState = defineStore('cube-moves-history-private', () => {
  const currentMoves = ref<Record<TCubeCommonNames, number>>({
    '2x2x2 Cube': -1,
    '3x3x3 Cube': -1,
    '4x4x4 Cube': -1,
    '5x5x5 Cube': -1,
    Megaminx: -1,
    Pyraminx: -1,
  });
  const targetMoves = ref<Record<TCubeCommonNames, number>>({
    '2x2x2 Cube': -1,
    '3x3x3 Cube': -1,
    '4x4x4 Cube': -1,
    '5x5x5 Cube': -1,
    Megaminx: -1,
    Pyraminx: -1,
  });

  const cubeMovesHistory = ref<Record<TCubeCommonNames, Array<TCubeMovesHistoryLog>>>({
    '2x2x2 Cube': [],
    '3x3x3 Cube': [],
    '4x4x4 Cube': [],
    '5x5x5 Cube': [],
    Megaminx: [],
    Pyraminx: [],
  });

  return {
    currentMoves,
    targetMoves,
    cubeMovesHistory,
  };
});

export const useCubeMovesHistoryStore = defineStore('cube-moves-history', () => {
  const privateState = useCubeMovesHistoryPrivateState();
  const { currentMoves, targetMoves } = storeToRefs(privateState);

  const selectedCubeStore = useSelectedCubeStore();
  const { getCurrentCubeProperties } = storeToRefs(selectedCubeStore);
  const cubeRotationTimesStore = useCubeRotationTimesStore();
  const { getCubeRotationTimes } = storeToRefs(cubeRotationTimesStore);
  const rotationFlagsStore = useRotationFlagsStore();
  const { getIsHistoryRotationPending, getIsRotationPending } = storeToRefs(rotationFlagsStore);
  const rotateCubeEventBus = useEventBus(useRotateCubeEventBus);

  const isMoveUpdateInProgress = ref<boolean>(false);
  const moveUpdateInterval = ref<Nullable<ReturnType<typeof setInterval>>>(null);

  /**
   * Clears the move update interval
   * If the move update interval is not null, it will be cleared
   */
  const clearMoveUpdateInterval = () => {
    if (moveUpdateInterval.value !== null) {
      clearInterval(moveUpdateInterval.value);
      moveUpdateInterval.value = null;
    }
  };

  /**
   * Updates the history rotation pending flag
   * If the history rotation pending flag is true, it will be set to false
   */
  const updateHistoryRotationPendingFlag = () => {
    if (getIsHistoryRotationPending.value) {
      rotationFlagsStore.setIsHistoryRotationPending(false);
    }
  };

  /**
   * Clears the move update interval and updates the history rotation pending flag
   */
  const clearMoveUpdateLogic = () => {
    clearMoveUpdateInterval();
    updateHistoryRotationPendingFlag();
    isMoveUpdateInProgress.value = false;
  };

  const updateCurrentMove = () => {
    const cubeName: TCubeCommonNames | undefined = getCurrentCubeProperties.value?.commonName;
    if (!cubeName) return;

    const currentMove: number = currentMoves.value[cubeName];
    const targetMove: number = targetMoves.value[cubeName];

    const isTargetReached: boolean = currentMove === targetMove;
    if (isTargetReached) {
      clearMoveUpdateLogic();
      return;
    }

    const direction: number = Math.sign(targetMove - currentMove);

    const executeHistoryMove = () => {
      const moveIndex: number = direction > 0 ? currentMove + 1 : currentMove;
      const move: TCubeMovesHistoryLog | undefined =
        privateState.cubeMovesHistory[cubeName][moveIndex];
      if (!move) return;
      rotateCubeEventBus.emit({
        face: move.rotationGroup,
        type: direction > 0 ? move.rotationType : move.contraryRotationType,
        source: 'history',
      });
    };

    if (getIsHistoryRotationPending.value) {
      if (getIsRotationPending.value) {
        const unwatch: WatchHandle = watch(
          getIsRotationPending,
          (isPending) => {
            if (!isPending) executeHistoryMove();
            unwatch();
          },
          { once: true },
        );
      } else {
        executeHistoryMove();
      }
    }
    currentMoves.value[cubeName] += direction;

    clearMoveUpdateInterval();
    const rotationTimeInMs: number = getCubeRotationTimes.value[cubeName] * 1000;
    moveUpdateInterval.value = setInterval(updateCurrentMove, rotationTimeInMs);
  };

  const startMoveUpdate = () => {
    const cubeName: TCubeCommonNames | undefined = getCurrentCubeProperties.value?.commonName;
    if (!cubeName) return;
    const currentMove: number = currentMoves.value[cubeName];
    const targetMove: number = targetMoves.value[cubeName];
    const isAlreadyOnTarget: boolean = currentMove === targetMove;
    if (isMoveUpdateInProgress.value || isAlreadyOnTarget) return;

    isMoveUpdateInProgress.value = true;
    updateCurrentMove();
  };

  watch(
    targetMoves,
    () => {
      startMoveUpdate();
    },
    {
      deep: true,
    },
  );

  const getCubeMovesHistory = computed<Record<TCubeCommonNames, Array<TCubeMovesHistoryLog>>>(
    () => {
      return privateState.cubeMovesHistory;
    },
  );

  const getCurrentMove = computed<number>(() => {
    const cubeCommonName = getCurrentCubeProperties.value?.commonName;
    if (!cubeCommonName) return -1;
    return currentMoves.value[cubeCommonName];
  });

  const getTargetMove = computed<number>(() => {
    const cubeCommonName = getCurrentCubeProperties.value?.commonName;
    if (!cubeCommonName) return -1;
    return targetMoves.value[cubeCommonName];
  });

  const addCubeMove = (cubeCommonName: TCubeCommonNames, data: TCubeMovesHistoryLog) => {
    const history = privateState.cubeMovesHistory[cubeCommonName];
    const targetIndex = targetMoves.value[cubeCommonName];
    history.splice(targetIndex + 1);
    history.push(data);
    targetMoves.value[cubeCommonName] = history.length - 1;
  };

  const removeLastCubeMove = (cubeCommonName: TCubeCommonNames) => {
    privateState.cubeMovesHistory[cubeCommonName].pop();
    targetMoves.value[cubeCommonName] = privateState.cubeMovesHistory[cubeCommonName].length - 1;
  };

  const setTargetMove = (cubeCommonName: TCubeCommonNames, targetMove: number) => {
    privateState.targetMoves[cubeCommonName] = targetMove;
  };

  return {
    getCubeMovesHistory,
    getCurrentMove,
    getTargetMove,
    addCubeMove,
    removeLastCubeMove,
    setTargetMove,
  };
});

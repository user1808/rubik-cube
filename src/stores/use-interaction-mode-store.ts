import { useInteractionModeEventBus } from '@/event-buses/use-interaction-mode-event-bus';
import { useEventBus } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type InteractionMode = 'Camera And Cube' | 'Camera Only' | 'Cube Only' | 'Camera Or Cube';
type CameraOrCubeOption = 'Camera' | 'Cube';

const useInteractionModePrivateState = defineStore(
  'interaction-mode-private',
  () => {
    const interactionModes: UnionToTuple<InteractionMode> = [
      'Camera And Cube',
      'Camera Only',
      'Cube Only',
      'Camera Or Cube',
    ];
    const cameraOrCubeOptions: UnionToTuple<CameraOrCubeOption> = ['Camera', 'Cube'];

    const interactionModesWithDescriptions: Record<InteractionMode, string> = {
      'Camera And Cube':
        'Directly control both cube rotation and camera movement with touch or  mouse. No additional controls needed.',
      'Camera Only':
        'Directly control camera movement with touch or mouse. Cube rotation available through on-screen controls.',
      'Cube Only':
        'Directly control cube rotation with touch or mouse. Camera movement available through on-screen controls.',
      'Camera Or Cube':
        'Switch between direct touch or mouse control of cube rotation or camera movement using on-screen switch.',
    };

    const interactionMode = ref<InteractionMode>('Camera And Cube');
    const cameraOrCubeOption = ref<CameraOrCubeOption>('Camera');

    return {
      interactionModes,
      cameraOrCubeOptions,
      interactionModesWithDescriptions,
      interactionMode,
      cameraOrCubeOption,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['interactionMode', 'cameraOrCubeOption'],
    },
  },
);

export const useInteractionModeStore = defineStore('interaction-mode', () => {
  const privateState = useInteractionModePrivateState();
  const interactionModeEventBus = useEventBus(useInteractionModeEventBus);

  const getInteractionModes = computed<Array<InteractionMode>>(() => {
    return privateState.interactionModes;
  });

  const getCameraOrCubeOptions = computed<Array<CameraOrCubeOption>>(() => {
    return privateState.cameraOrCubeOptions;
  });

  const getInteractionModeDescription = computed<string>(() => {
    return privateState.interactionModesWithDescriptions[privateState.interactionMode];
  });

  const getInteractionMode = computed<InteractionMode>(() => {
    return privateState.interactionMode;
  });

  const getCameraOrCubeOption = computed<CameraOrCubeOption>(() => {
    return privateState.cameraOrCubeOption;
  });

  const setInteractionMode = (interactionMode: InteractionMode): void => {
    privateState.interactionMode = interactionMode;
    interactionModeEventBus.emit('update-interaction-mode-controls');
  };

  const setCameraOrCubeOption = (cameraOrCubeOption: CameraOrCubeOption): void => {
    privateState.cameraOrCubeOption = cameraOrCubeOption;
    interactionModeEventBus.emit('update-interaction-mode-controls');
  };

  const toggleCameraOrCubeOption = (): void => {
    const currentCameraOrCubeOption = privateState.cameraOrCubeOption;
    switch (currentCameraOrCubeOption) {
      case 'Camera':
        setCameraOrCubeOption('Cube');
        return;
      case 'Cube':
        setCameraOrCubeOption('Camera');
        return;
      default:
        currentCameraOrCubeOption satisfies never;
    }
  };

  return {
    getInteractionModes,
    getCameraOrCubeOptions,
    getInteractionModeDescription,
    getInteractionMode,
    getCameraOrCubeOption,
    setInteractionMode,
    setCameraOrCubeOption,
    toggleCameraOrCubeOption,
  };
});

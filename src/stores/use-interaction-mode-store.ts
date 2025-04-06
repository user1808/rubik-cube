import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const interactionModesWithDescriptions = {
  'Camera And Cube':
    'Directly control both cube rotation and camera movement with touch or  mouse. No additional controls needed.',

  'Camera Only':
    'Directly control camera movement with touch or mouse. Cube rotation available through on-screen controls.',

  'Cube Only':
    'Directly control cube rotation with touch or mouse. Camera movement available through on-screen controls.',

  'Camera Or Cube':
    'Switch between direct touch or mouse control of cube rotation or camera movement using on-screen switch.',
};
type InteractionMode = keyof typeof interactionModesWithDescriptions;
const cameraOrCubeOptions = ['Camera', 'Cube'] as const;
type CameraOrCube = (typeof cameraOrCubeOptions)[number];

export const useInteractionModeStore = defineStore(
  'interaction-mode',
  () => {
    const interactionMode = ref<InteractionMode>('Camera And Cube');
    const cameraOrCube = ref<CameraOrCube>('Camera');

    const getInteractionModes = computed<Array<InteractionMode>>(() => {
      return Object.keys(interactionModesWithDescriptions) as Array<InteractionMode>;
    });
    const getInteractionModeDescription = computed<Record<InteractionMode, string>>(() => {
      return interactionModesWithDescriptions;
    });
    const getCameraOrCubeOptions = computed<Array<CameraOrCube>>(() => {
      return [...cameraOrCubeOptions];
    });

    const toggleCameraOrCube = () => {
      cameraOrCube.value = cameraOrCube.value === 'Camera' ? 'Cube' : 'Camera';
    };

    return {
      interactionMode,
      cameraOrCube,
      getInteractionModes,
      getInteractionModeDescription,
      getCameraOrCubeOptions,
      toggleCameraOrCube,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['interactionMode', 'cameraOrCube'],
    },
  },
);

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useSettingsStore } from './use-settings-store';
import type { TCubeFaceMaterial } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

const useColorCubeModePrivateState = defineStore('color-cube-mode-private', () => {
  const isColorCubeModeOn = ref<boolean>(false);
  const isColorCubeModeColorOn = ref<boolean>(true);

  const selectedMaterial = ref<TCubeFaceMaterial | undefined>(undefined);

  return {
    isColorCubeModeOn,
    isColorCubeModeColorOn,
    selectedMaterial,
  };
});

export const useColorCubeModeStore = defineStore('color-cube-mode', () => {
  const privateState = useColorCubeModePrivateState();
  const settingsStateStore = useSettingsStore();

  const getIsColorCubeModeOn = computed<boolean>(() => {
    return privateState.isColorCubeModeOn;
  });

  const getIsColorCubeModeColorOn = computed<boolean>(() => {
    return privateState.isColorCubeModeColorOn;
  });

  const getSelectedMaterial = computed<TCubeFaceMaterial | undefined>(() => {
    return privateState.selectedMaterial;
  });

  const setIsColorCubeModeColorOn = (value: boolean): void => {
    privateState.isColorCubeModeColorOn = value;
  };

  const enterColorCubeMode = (): void => {
    privateState.isColorCubeModeOn = true;
    settingsStateStore.setIsSettingsOpen(false);
    privateState.isColorCubeModeColorOn = false;
  };

  const exitColorCubeMode = (): void => {
    privateState.isColorCubeModeOn = false;
    settingsStateStore.setIsSettingsOpen(true);
    privateState.isColorCubeModeColorOn = false;
  };

  const setSelectedMaterial = (material: TCubeFaceMaterial): void => {
    privateState.selectedMaterial = material;
  };

  return {
    getIsColorCubeModeOn,
    getIsColorCubeModeColorOn,
    getSelectedMaterial,
    setIsColorCubeModeColorOn,
    enterColorCubeMode,
    exitColorCubeMode,
    setSelectedMaterial,
  };
});

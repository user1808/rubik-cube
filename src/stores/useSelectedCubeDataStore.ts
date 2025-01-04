import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TCubeCommonName } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';

export const useSelectedCubeDataStore = defineStore('selected-cube-data', () => {
  const selectedCubeCommonName = ref<Nullable<TCubeCommonName>>(null);

  return {
    selectedCubeCommonName,
  };
});

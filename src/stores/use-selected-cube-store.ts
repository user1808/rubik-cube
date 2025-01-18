import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';

type AvailableCubes<CubesTuple extends unknown[] = Reverse<UnionToTuple<TCubeCommonNames>>> =
  CubesTuple extends [infer Head, ...infer Tail] ? [{ name: Head }, ...AvailableCubes<Tail>] : [];

type SelectedCubeData = {
  idx: number;
  name: TCubeCommonNames;
};

const useSelectedCubeStorePrivateState = defineStore('selected-cube-private', () => {
  const availableCubes = ref<AvailableCubes>([
    { name: '2x2 Cube' },
    { name: '3x3 Cube' },
    { name: '4x4 Cube' },
    { name: '5x5 Cube' },
    { name: 'Megaminx' },
    { name: 'Pyraminx' },
  ]);
  const selectedCubeIdx = ref<number>(1);

  return {
    availableCubes,
    selectedCubeIdx,
  };
});

export const useSelectedCubeStore = defineStore('selected-cube', () => {
  const privateState = useSelectedCubeStorePrivateState();

  const getSelectedCubeData = computed<SelectedCubeData>(() => {
    const idx = privateState.selectedCubeIdx;
    return {
      idx,
      name: privateState.availableCubes[idx].name,
    };
  });

  const getAllAvailableCubesNames = computed<Array<TCubeCommonNames>>(() =>
    privateState.availableCubes.map((cube) => cube.name),
  );

  const setSelectedCube = (idx: number) => {
    privateState.selectedCubeIdx = idx;
  };

  return {
    getSelectedCubeData,
    getAllAvailableCubesNames,
    setSelectedCube,
  };
});

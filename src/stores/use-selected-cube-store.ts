import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import { HexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import { TetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import { DodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import { HexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { TetrahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/rotation-types';
import { DodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';

type CubeProperties<CubeName extends TCubeCommonNames> = {
  name: CubeName;
  cameraMinDistance: number;
  faces: Readonly<Array<string>>;
  rotationTypes: Readonly<Array<string>>;
};

type SelectableCubes<CubesTuple extends unknown[] = Reverse<UnionToTuple<TCubeCommonNames>>> =
  CubesTuple extends [infer Head extends TCubeCommonNames, ...infer Tail]
    ? [CubeProperties<Head>, ...SelectableCubes<Tail>]
    : [];

const useSelectedCubeStorePrivateState = defineStore('selected-cube-private', () => {
  const selectableCubes = ref<SelectableCubes>([
    {
      name: '2x2 Cube',
      cameraMinDistance: Math.sqrt(3),
      faces: HexahedronFaces,
      rotationTypes: HexahedronRotationTypes,
    },
    {
      name: '3x3 Cube',
      cameraMinDistance: 1.5 * Math.sqrt(3),
      faces: HexahedronFaces,
      rotationTypes: HexahedronRotationTypes,
    },
    {
      name: '4x4 Cube',
      cameraMinDistance: 2 * Math.sqrt(3),
      faces: HexahedronFaces,
      rotationTypes: HexahedronRotationTypes,
    },
    {
      name: '5x5 Cube',
      cameraMinDistance: 2.5 * Math.sqrt(3),
      faces: HexahedronFaces,
      rotationTypes: HexahedronRotationTypes,
    },
    {
      name: 'Megaminx',
      cameraMinDistance: 0.5 * Math.sqrt(3) * (1 + Math.sqrt(5)),
      faces: DodecahedronFaces,
      rotationTypes: DodecahedronRotationTypes,
    },
    {
      name: 'Pyraminx',
      cameraMinDistance: 1.2 * Math.sqrt(6),
      faces: TetrahedronFaces,
      rotationTypes: TetrahedronRotationTypes,
    },
  ]);

  return {
    selectableCubes,
  };
});

export const useSelectedCubeStore = defineStore('selected-cube', () => {
  const privateState = useSelectedCubeStorePrivateState();

  const currentCubeIndex = ref<number>(1);

  const getCurrentCube = computed<SelectableCubes[number]>(() => {
    return privateState.selectableCubes[currentCubeIndex.value];
  });

  const getAllSelectableCubesNames = computed<Array<TCubeCommonNames>>(() => {
    return privateState.selectableCubes.map((cube) => cube.name);
  });

  return {
    currentCubeIndex,
    getCurrentCube,
    getAllSelectableCubesNames,
  };
});

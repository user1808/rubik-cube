<template>
  <main>
    <RubikCubeAppView />
  </main>
</template>

<script setup lang="ts">
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import RubikCubeAppView from './views/rubik-cube-app-view.vue';
import { RubikDodecahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/factory';
import { RubikHexahedron2x2Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/2x2/factory';
import { RubikHexahedron3x3Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/3x3/factory';
import { RubikHexahedron4x4Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/4x4/factory';
import { RubikHexahedron5x5Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/5x5/factory';
import { RubikTetrahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/factory';

type RubikFactories = {
  [CubeCommonName in TCubeCommonNames]: IRubikCubeFactory<Record<string, string>, CubeCommonName>;
};

const rubikFactories: RubikFactories = {
  '2x2 Cube': new RubikHexahedron2x2Factory(),
  '3x3 Cube': new RubikHexahedron3x3Factory(),
  '4x4 Cube': new RubikHexahedron4x4Factory(),
  '5x5 Cube': new RubikHexahedron5x5Factory(),
  Megaminx: new RubikDodecahedronFactory(),
  Pyraminx: new RubikTetrahedronFactory(),
};
</script>

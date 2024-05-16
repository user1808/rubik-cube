<template>
  <div>
    <RubikCubeCanvas class="fixed left-0 top-0" :factory="selectedFactory" />
    <RubikCubeStepsSelect class="fixed inset-x-0 top-0" />
    <RubikCubeTypeSelect
      class="fixed inset-x-0 bottom-0"
      :factories="rubikFactories"
      v-model:selected-factory-idx="selectedFactoryIdx"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import RubikCubeCanvas from '@/components/rubik-cube-canvas.vue';
import RubikCubeTypeSelect from '@/components/rubik-cube-type-select.vue';
import RubikCubeStepsSelect from '@/components/rubik-cube-steps-select.vue';

import { RubikDodecahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/factory';
import { RubikHexahedron2x2Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/2x2/factory';
import { RubikHexahedron3x3Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/3x3/factory';
import { RubikHexahedron4x4Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/4x4/factory';
import { RubikHexahedron5x5Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/5x5/factory';
import { RubikTetrahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/factory';
import type { TUniversalRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';

const selectedFactoryIdx = ref<number>(5);
const selectedFactory = computed(() => rubikFactories[selectedFactoryIdx.value]);

const rubikFactories: Array<TUniversalRubikCubeFactory> = [
  new RubikHexahedron2x2Factory(),
  new RubikHexahedron3x3Factory(),
  new RubikHexahedron4x4Factory(),
  new RubikHexahedron5x5Factory(),
  new RubikTetrahedronFactory(),
  new RubikDodecahedronFactory(),
];
</script>

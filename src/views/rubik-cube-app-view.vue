<template>
  <div>
    <RubikCubeSettings />
    <RubikCubeCanvas class="fixed left-0 top-0" :factory="selectedFactory" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces';
import RubikCubeCanvas from '@/components/rubik-cube-canvas.vue';
import { RubikDodecahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/dodecahedron/factory';
import { RubikHexahedron2x2Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/2x2/factory';
import { RubikHexahedron3x3Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/3x3/factory';
import { RubikHexahedron4x4Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/4x4/factory';
import { RubikHexahedron5x5Factory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/hexahedron/5x5/factory';
import { RubikTetrahedronFactory } from '@/rubik-cube-app/rubik-cube/classes/specific-rubik-cube/tetrahedron/factory';
import RubikCubeSettings from '@/components/rubik-cube-settings.vue';
import { useSelectedCubeDataStore } from '@/stores/useSelectedCubeDataStore';

const store = useSelectedCubeDataStore();

const selectedFactoryIdx = ref<number>(1);
const selectedFactory = computed(() => rubikFactories[selectedFactoryIdx.value]);

const rubikFactories: Array<IRubikCubeFactory<Record<string, string>>> = [
  new RubikHexahedron2x2Factory(),
  new RubikHexahedron3x3Factory(),
  new RubikHexahedron4x4Factory(),
  new RubikHexahedron5x5Factory(),
  new RubikTetrahedronFactory(),
  new RubikDodecahedronFactory(),
];

store.selectedCubeCommonName = selectedFactory.value.commonName;
</script>

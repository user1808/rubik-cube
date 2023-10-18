<template>
  <canvas id="rubic-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import GUI from 'lil-gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue';
import { RubikCube3x3Factory } from '@/three.js/RubikCube/classes/RubikCube3x3/RubikCube3x3Factory';
import type { IRubikCubeRotationHelper } from '@/three.js/RubikCube/interfaces/IRubikCubeRotationHelper';
import type { TRubikCube3x3FaceNames } from '@/three.js/RubikCube/types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from '@/three.js/RubikCube/types/RubikCube3x3/TRubikCube3x3RotationTypes';
import type { IRubikCube } from '@/three.js/RubikCube/interfaces/IRubikCube';

const gui = new GUI();
const rotateParams: { faceType: TRubikCube3x3FaceNames; rotateType: TRubikCube3x3RotationTypes } = {
  faceType: 'TopFace',
  rotateType: 'Clockwise',
};

gui.add(rotateParams, 'faceType', [
  'TopFace',
  'DownFace',
  'LeftFace',
  'RightFace',
  'FrontFace',
  'BackFace',
]);
gui.add(rotateParams, 'rotateType', ['Clockwise', 'CounterClockwise', 'DoubleTurn']);

const canvas = ref<HTMLCanvasElement | null>(null);
const screenSizes = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});
const gltfLoader = new GLTFLoader();

let cube: IRubikCube<TRubikCube3x3FaceNames, 'Cover'> | null = null;
let rotationHelper: IRubikCubeRotationHelper<
  TRubikCube3x3FaceNames,
  'Cover',
  TRubikCube3x3RotationTypes
> | null = null;
const scene = new THREE.Scene();

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  gltfLoader.load('RubikCubePiece.glb', (data) => {
    const cubeFactory = new RubikCube3x3Factory(data.scene);

    cube = cubeFactory.createRubikCube();
    scene.add(...cube.pieces.map((piece) => piece.entirePiece));

    rotationHelper = cubeFactory.createRubikCubeRotationHelper();
  });

  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(
    75,
    screenSizes.value.width / screenSizes.value.height,
    0.1,
    100,
  );
  camera.position.z = 6;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas.value);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
  });
  renderer.setSize(screenSizes.value.width, screenSizes.value.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener('resize', () => {
    // Update sizes
    screenSizes.value.width = window.innerWidth;
    screenSizes.value.height = window.innerHeight;

    // Update camera
    camera.aspect = screenSizes.value.width / screenSizes.value.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(screenSizes.value.width, screenSizes.value.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const tick = () => {
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
});

const guiFunc = {
  rotate: () => {
    if (rotationHelper && cube) {
      rotationHelper.rotateCube(scene, cube, rotateParams.faceType, rotateParams.rotateType);
    }
  },
};
gui.add(guiFunc, 'rotate');
</script>

<style scoped lang="scss">
#rubic-cube {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>

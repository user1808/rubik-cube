<template>
  <canvas id="rubic-cube" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import GUI from 'lil-gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue';
import { RubikCube3x3Creator } from '@/three.js/RubikCube/classes/RubikCube3x3/RubikCube3x3Creator';
import { RubikCube3x3Data } from '@/three.js/RubikCube/classes/RubikCube3x3/RubikCube3x3Data';

// const gui = new GUI();
// const rotateParams: { faceType: TCubeFaceNames; rotateType: TRotationType } = {
//   faceType: 'TopFace',
//   rotateType: 'Clockwise',
// };
const rubikCubeMaterials = {
  Cover: new THREE.MeshBasicMaterial({ color: 0x2b2b2b }),
  TopFace: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  DownFace: new THREE.MeshBasicMaterial({ color: 0xffa500 }),
  LeftFace: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  RightFace: new THREE.MeshBasicMaterial({ color: 0xffffff }),
  FrontFace: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  BackFace: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
};

// gui.add(rotateParams, 'faceType', [
//   'TopFace',
//   'DownFace',
//   'LeftFace',
//   'RightFace',
//   'FrontFace',
//   'BackFace',
// ]);
// gui.add(rotateParams, 'rotateType', ['Clockwise', 'CounterClockwise', 'DoubleTurn']);
// gui.addColor(rubikCubeMaterials['FrontFace'], 'color');

const canvas = ref<HTMLCanvasElement | null>(null);
const screenSizes = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});
const gltfLoader = new GLTFLoader();

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  const scene = new THREE.Scene();

  gltfLoader.load('RubikCubePiece.glb', (data) => {
    const cubeCreator = new RubikCube3x3Creator(
      data.scene,
      rubikCubeMaterials,
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
      new RubikCube3x3Data(),
    );

    cubeCreator.addRubikCubeToScene(scene);
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

// const guiFunc = {
//   rotate: () => {
//     console.log('rotate!');
//   },
// };
// gui.add(guiFunc, 'rotate');
</script>

<style scoped lang="scss">
#rubic-cube {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>

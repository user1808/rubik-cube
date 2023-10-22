<template>
  <canvas id="rubik-cube" ref="canvas"></canvas>
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
import type { IRubikCubeRayCastingData } from '@/three.js/RubikCube/interfaces/IRubikCubeRayCastingData';

function arraysAreEqual(array1: number[], array2: number[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((value, index) => value === array2[index]);
}

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
  'SliceXFace',
  'SliceYFace',
  'SliceZFace',
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
let rayCasingData: IRubikCubeRayCastingData<
  TRubikCube3x3FaceNames,
  TRubikCube3x3RotationTypes
> | null = null;
const scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const rayCastedPieces: Set<number> = new Set();
const rayCastedFace: Array<string> = [];
let isRayCastingEnable: boolean = false;
window.addEventListener('mousedown', () => {
  isRayCastingEnable = true;
});
window.addEventListener('touchstart', (event) => {
  isRayCastingEnable = true;
  mouse.x = (event.touches[0].clientX / screenSizes.value.width) * 2 - 1;
  mouse.y = -((event.touches[0].clientY / screenSizes.value.height) * 2 - 1);
});
window.addEventListener('mouseup', () => {
  isRayCastingEnable = false;
  rayCastedPieces.clear();
  rayCastedFace.pop();
});
window.addEventListener('touchend', () => {
  isRayCastingEnable = false;
  rayCastedPieces.clear();
  rayCastedFace.pop();
});

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / screenSizes.value.width) * 2 - 1;
  mouse.y = -((event.clientY / screenSizes.value.height) * 2 - 1);
});
window.addEventListener('touchmove', (event) => {
  mouse.x = (event.touches[0].clientX / screenSizes.value.width) * 2 - 1;
  mouse.y = -((event.touches[0].clientY / screenSizes.value.height) * 2 - 1);
});

const camera = new THREE.PerspectiveCamera(
  75,
  screenSizes.value.width / screenSizes.value.height,
  0.1,
  15,
);
camera.position.z = 6;
scene.add(camera);

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  gltfLoader.load('RubikCubePiece.glb', (data) => {
    const cubeFactory = new RubikCube3x3Factory(data.scene);

    cube = cubeFactory.createRubikCube();
    scene.add(...cube.pieces.map((piece) => piece.entirePiece));

    rotationHelper = cubeFactory.createRubikCubeRotationHelper();
    rayCasingData = cubeFactory.createRubikCubeRayCastingData();
  });

  const axesHelper = new THREE.AxesHelper(4);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, canvas.value);
  controls.enablePan = false;
  controls.minDistance = 2 * Math.SQRT2;
  controls.maxDistance = 10;
  controls.enableDamping = true;

  gui.add(controls, 'enabled');

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
    raycaster.setFromCamera(mouse, camera);

    if (cube && rotationHelper && rayCasingData && isRayCastingEnable && !controls.enabled) {
      const intersects = raycaster.intersectObjects(cube.pieces.map((piece) => piece.entirePiece));
      if (intersects[0]) {
        if (rayCastedPieces.size < 3) {
          rayCastedPieces.add(intersects[0].object.parent?.userData.id);
        }
        const face = Object.entries(rayCasingData.faceSelectionConditions)
          .filter((face) => face[1](intersects[0]))
          .map((face) => face[0]);
        if (rayCastedFace.length < 1) {
          rayCastedFace.push(face[0]);
        }
      }

      if (
        rayCastedFace[0] &&
        (rayCastedFace[0] === 'FrontFace' ||
          rayCastedFace[0] === 'BackFace' ||
          rayCastedFace[0] === 'RightFace' ||
          rayCastedFace[0] === 'LeftFace' ||
          rayCastedFace[0] === 'TopFace' ||
          rayCastedFace[0] === 'DownFace') &&
        Array.from(rayCastedPieces).length === 3
      ) {
        const rotatedFacePiecesIds = cube.faces
          .get(rayCastedFace[0] as TRubikCube3x3FaceNames)
          ?.map((piece) => piece.id)!;
        const rotationType = rayCasingData.selectedPiecesRotationType[rayCastedFace[0]].find(
          ({ faceSelectedPiecesIdxs }) => {
            const piecesIds = [
              rotatedFacePiecesIds[faceSelectedPiecesIdxs[0]],
              rotatedFacePiecesIds[faceSelectedPiecesIdxs[1]],
              rotatedFacePiecesIds[faceSelectedPiecesIdxs[2]],
            ];
            return arraysAreEqual(Array.from(rayCastedPieces), piecesIds);
          },
        );
        if (rotationType) {
          rotationHelper.rotateCube(
            scene,
            cube,
            rotationType.faceToRotate,
            rotationType.rotationType,
          );
          rayCastedFace.pop();
          rayCastedPieces.clear();
          isRayCastingEnable = false;
        }
      }
    }

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
canvas#rubik-cube {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>

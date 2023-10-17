import * as THREE from 'three';
import gsap from 'gsap';
import type { RubikCubePiece } from './RubikCubePiece';
import { RubikCubeData } from './RubikCubeData';
import type {
  TCubeFaceNames,
  TFaceRotationAxesData,
  TRotationType,
  TRotationTypeData,
} from './RubikCube.types';

const TURN_DURATION = 1 as const;
const DOUBLE_TURN_DURATION = 2 as const;

export class RubikCubeRotationHelper {
  private readonly FACES_ROTATION_AXES: TFaceRotationAxesData = {
    TopFace: { axis: 'y', turn: 1 },
    DownFace: { axis: 'y', turn: -1 },
    LeftFace: { axis: 'x', turn: -1 },
    RightFace: { axis: 'x', turn: 1 },
    FrontFace: { axis: 'z', turn: 1 },
    BackFace: { axis: 'z', turn: -1 },
  };
  private readonly ROTATION_TYPES: TRotationTypeData = {
    CounterClockwise: {
      angle: 0.5 * Math.PI,
      swapPiecesIdxs: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      duration: TURN_DURATION,
    },
    Clockwise: {
      angle: -0.5 * Math.PI,
      swapPiecesIdxs: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      duration: TURN_DURATION,
    },
    DoubleTurn: {
      angle: Math.PI,
      swapPiecesIdxs: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      duration: DOUBLE_TURN_DURATION,
    },
  };
  private isRotationAllowed: boolean = true;

  constructor(
    private readonly scene: THREE.Scene,
    private readonly cubeFaces: Map<TCubeFaceNames, Array<RubikCubePiece>>,
    private readonly allPieces: Array<RubikCubePiece>,
  ) {}

  public rotateRubikCube(rotatedFaceName: TCubeFaceNames, rotationType: TRotationType) {
    if (!this.isRotationAllowed) {
      return;
    }

    const rotatedFace = this.cubeFaces.get(rotatedFaceName);
    if (!rotatedFace) {
      throw new Error();
    }

    this.isRotationAllowed = false;

    const rotationGroup = this.createGroupToPerformRotation(rotatedFace);
    this.performRotation(rotationGroup, rotatedFaceName, rotationType);
  }

  private createGroupToPerformRotation(rotatedFace: Array<RubikCubePiece>): THREE.Group {
    const rotationGroup = new THREE.Group();
    this.scene.add(rotationGroup);
    rotationGroup.add(...rotatedFace.map((piece) => piece.getPiece()));
    return rotationGroup;
  }

  private performRotation(
    group: THREE.Group,
    rotatedFaceType: TCubeFaceNames,
    rotationType: TRotationType,
  ) {
    const { axis, turn } = this.FACES_ROTATION_AXES[rotatedFaceType];
    const { angle, duration } = this.ROTATION_TYPES[rotationType];
    gsap
      .to(group.rotation, {
        duration,
        [axis]: group.rotation[axis] + turn * angle,
      })
      .then(() => {
        this.removeGroupToPerformRotation(group);
        this.updateCubeFaces(rotatedFaceType, rotationType);
        this.isRotationAllowed = true;
      });
  }

  private removeGroupToPerformRotation(group: THREE.Group) {
    this.scene.add(
      ...group.children.map((piece) => {
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        piece.getWorldPosition(position);
        piece.position.set(position.x, position.y, position.z);
        group.getWorldQuaternion(quaternion);
        piece.applyQuaternion(quaternion);
        return piece;
      }),
    );
    this.scene.remove(group);
  }

  private updateCubeFaces(rotatedFaceType: TCubeFaceNames, rotationType: TRotationType) {
    const rotatedFace = this.cubeFaces.get(rotatedFaceType);
    if (!rotatedFace) {
      throw new Error();
    }
    const rotatedFaceClone = [
      ...rotatedFace.map((piece) => {
        return Object.assign({}, piece);
      }),
    ];

    const allPiecesIdx = RubikCubeData.RUBIK_CUBE_FACE_PIECE_IDXS.get(rotatedFaceType);
    if (!allPiecesIdx) {
      throw new Error();
    }
    const { swapPiecesIdxs } = this.ROTATION_TYPES[rotationType];
    for (let i = 0; i < allPiecesIdx.length; i++) {
      Object.assign(this.allPieces[allPiecesIdx[i]], rotatedFaceClone[swapPiecesIdxs[i]]);
    }
  }
}

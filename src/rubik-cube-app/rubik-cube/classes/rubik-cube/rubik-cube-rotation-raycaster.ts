import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import type { IRubikCube } from '../../interfaces/structure';
import { TypeGuards } from '@/utils/type-guards';
import { MouseButtonEnum } from '@/utils/mouse_button_enum';
import type { IRubikCubeRotationRaycaster } from '../../interfaces';

export class RubikCubeRotationRaycaster<
    TCubeFacesNames extends string,
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellPieces extends string,
  >
  extends THREE.Raycaster
  implements IRubikCubeRotationRaycaster
{
  private readonly intersectionData: Record<
    'FirstPoint' | 'SecondPoint',
    Nullable<[point: THREE.Vector3, shellPieceName: TCubeShellPieces]>
  > = { FirstPoint: null, SecondPoint: null };

  private readonly mouseMoveLimit = 4;
  private mouseMoveCounter = 0;

  constructor(
    private readonly cube: IRubikCube<
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    private readonly mouseTouchTracker: MouseTouchTracker,
    private readonly orbitControls: OrbitControls,
  ) {
    super();
    this.camera = cube.camera;
  }

  public start(): void {
    window.addEventListener('mousedown', this.onMouseDownEventCallback);
    window.addEventListener('mousemove', this.onMouseMoveEventCallback);
    window.addEventListener('mouseup', this.onMouseUpEventCallback);
    window.addEventListener('touchstart', this.onTouchStartEventCallback);
    window.addEventListener('touchmove', this.onTouchMoveEventCallback);
    window.addEventListener('touchend', this.onTouchEndEventCallback);
  }
  public stop(): void {
    window.removeEventListener('mousedown', this.onMouseDownEventCallback);
    window.removeEventListener('mousemove', this.onMouseMoveEventCallback);
    window.removeEventListener('mouseup', this.onMouseUpEventCallback);
    window.removeEventListener('touchstart', this.onTouchStartEventCallback);
    window.removeEventListener('touchmove', this.onTouchMoveEventCallback);
    window.removeEventListener('touchend', this.onTouchEndEventCallback);
  }

  private onMouseDownEventCallback: (event: MouseEvent) => void = this.onMouseDown.bind(this);
  private onMouseMoveEventCallback: (event: MouseEvent) => void = this.onMouseMove.bind(this);
  private onMouseUpEventCallback: (event: MouseEvent) => void = this.onMouseUp.bind(this);

  private onTouchStartEventCallback: (event: TouchEvent) => void = this.onMouseDown.bind(this);
  private onTouchMoveEventCallback: (event: TouchEvent) => void = this.onMouseMove.bind(this);
  private onTouchEndEventCallback: (event: TouchEvent) => void = this.onMouseUp.bind(this);

  private onMouseDown(event: MouseEvent | TouchEvent): void {
    if (event instanceof MouseEvent && event.button !== MouseButtonEnum.Main) return;
    this.intersectionData.FirstPoint = this.getIntersectionData();
    this.orbitControls.enabled = !this.intersectionData.FirstPoint;
  }

  private onMouseUp(event: MouseEvent | TouchEvent): void {
    if (event instanceof MouseEvent && event.button !== MouseButtonEnum.Main) return;
    this.resetIntersection();
    this.orbitControls.enabled = true;
  }

  private onMouseMove(event: MouseEvent | TouchEvent): void {
    if (
      !this.intersectionData.FirstPoint ||
      (event instanceof MouseEvent && event.button !== MouseButtonEnum.Main)
    )
      return;

    this.mouseMoveCounter++;
    if (this.mouseMoveCounter < this.mouseMoveLimit) return;

    const calculatedDirection = this.calculateDirectionVector();
    if (!calculatedDirection) return;

    const bestRotation = this.findBestRotation(calculatedDirection);
    if (!bestRotation) return;

    this.cube.rotate(bestRotation[0], bestRotation[1]);
    this.resetIntersection();
  }

  private calculateDirectionVector(): Nullable<THREE.Vector3> {
    this.intersectionData.SecondPoint = this.getIntersectionData();
    if (!this.intersectionData.SecondPoint || !this.intersectionData.FirstPoint) return null;
    const calculatedDirection = this.intersectionData.SecondPoint[0]
      .clone()
      .sub(this.intersectionData.FirstPoint[0])
      .normalize();
    return calculatedDirection;
  }

  private findBestRotation(
    calculatedDirection: THREE.Vector3,
  ): Nullable<[TCubeRotationGroups, TCubeRotationTypes]> {
    if (!this.intersectionData.SecondPoint || !this.intersectionData.FirstPoint) return null;
    const rotationData = this.cube.shell.pieces[this.intersectionData.FirstPoint[1]].data;
    rotationData.sort((a, b) => {
      return b.direction.dot(calculatedDirection) - a.direction.dot(calculatedDirection);
    });

    return rotationData.length > 0
      ? [rotationData[0].rotationGroup, rotationData[0].rotationType]
      : null;
  }

  private getIntersectionData(): (typeof this.intersectionData)[keyof typeof this.intersectionData] {
    this.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);
    const intersections = this.intersectObject(this.cube);
    const intersection = intersections.length > 0 ? intersections[0] : null;
    if (intersection && TypeGuards.isObjectKey(intersection.object.name, this.cube.shell.pieces)) {
      return [intersection.point, intersection.object.name];
    }
    return null;
  }

  private resetIntersectionPoints(): void {
    this.intersectionData.FirstPoint = null;
    this.intersectionData.SecondPoint = null;
  }

  private resetMoveCounter(): void {
    this.mouseMoveCounter = 0;
  }

  private resetIntersection(): void {
    this.resetIntersectionPoints();
    this.resetMoveCounter();
  }
}
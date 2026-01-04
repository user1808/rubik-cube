import { Raycaster } from 'three';
import type { IRubikCubeColorRaycaster } from '../../interfaces/rubik-cube-color-raycaster';
import type { IRubikCube } from '../../interfaces/structure';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';
import { RubikCubePieceVisibleFace } from './structure/piece/rubik-cube-piece-visible-face';
import type { TCubeCommonNames } from '../../types/cube-common-name';
import type { CustomOrbitControls } from '@/rubik-cube-app/common/custom';

export class RubikCubeColorRaycaster extends Raycaster implements IRubikCubeColorRaycaster {
  private readonly colorCubeModeStore = useColorCubeModeStore();
  private isPointerDown = false;

  private readonly onMouseDownEventCallback = this.onPointerDown.bind(this);
  private readonly onTouchStartEventCallback = this.onPointerDown.bind(this);
  private readonly onMouseMoveEventCallback = this.onPointerMove.bind(this);
  private readonly onTouchMoveEventCallback = this.onPointerMove.bind(this);
  private readonly onMouseUpEventCallback = this.onPointerUp.bind(this);
  private readonly onTouchEndEventCallback = this.onPointerUp.bind(this);

  constructor(
    private readonly cube: IRubikCube,
    private readonly mouseTouchTracker: MouseTouchTracker,
    private readonly orbitControls: CustomOrbitControls,
  ) {
    super();
    this.camera = cube.camera;
  }

  public start(): void {
    window.addEventListener('mousedown', this.onMouseDownEventCallback);
    window.addEventListener('touchstart', this.onTouchStartEventCallback);
    window.addEventListener('mousemove', this.onMouseMoveEventCallback);
    window.addEventListener('touchmove', this.onTouchMoveEventCallback);
    window.addEventListener('mouseup', this.onMouseUpEventCallback);
    window.addEventListener('touchend', this.onTouchEndEventCallback);
  }

  public stop(): void {
    window.removeEventListener('mousedown', this.onMouseDownEventCallback);
    window.removeEventListener('touchstart', this.onTouchStartEventCallback);
    window.removeEventListener('mousemove', this.onMouseMoveEventCallback);
    window.removeEventListener('touchmove', this.onTouchMoveEventCallback);
    window.removeEventListener('mouseup', this.onMouseUpEventCallback);
    window.removeEventListener('touchend', this.onTouchEndEventCallback);
  }

  private onPointerDown(): void {
    if (
      !this.colorCubeModeStore.getIsColorCubeModeOn ||
      !this.colorCubeModeStore.getIsColorCubeModeColorOn
    ) {
      return;
    }
    this.colorFace(true);
  }

  private onPointerMove(): void {
    if (!this.isPointerDown) return;
    this.colorFace(false);
  }

  private onPointerUp(): void {
    this.isPointerDown = false;
    this.orbitControls.updateEnabled(true);
  }

  private colorFace(isOnPointerDown: boolean): void {
    const visibleFace = this.getIntersectionVisibleFace();
    const selectedMaterial = this.colorCubeModeStore.getSelectedMaterial;
    if (!visibleFace || !selectedMaterial || visibleFace.getColor() === selectedMaterial.color) {
      return;
    }
    if (isOnPointerDown) {
      this.isPointerDown = true;
      this.orbitControls.updateEnabled(false);
    }
    visibleFace.updateColor(selectedMaterial);
    this.cube.updateLogicalFaces();
  }

  private getIntersectionVisibleFace(): Nullable<RubikCubePieceVisibleFace<TCubeCommonNames>> {
    this.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);
    const intersections = this.intersectObject(this.cube);
    const object: RubikCubePieceVisibleFace<TCubeCommonNames> | undefined = intersections.find(
      (intersection) => intersection.object instanceof RubikCubePieceVisibleFace,
    )?.object as RubikCubePieceVisibleFace<TCubeCommonNames> | undefined;
    return object ?? null;
  }
}

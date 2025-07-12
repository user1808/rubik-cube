import { Raycaster } from 'three';
import type { IRubikCubeColorRaycaster } from '../../interfaces/rubik-cube-color-raycaster';
import type { IRubikCube } from '../../interfaces/structure';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import { useColorCubeModeStore } from '@/stores/use-color-cube-mode-store';
import { RubikCubePieceVisibleFace } from './structure/piece/rubik-cube-piece-visible-face';
import type { TCubeCommonNames } from '../../types/cube-common-name';

export class RubikCubeColorRaycaster extends Raycaster implements IRubikCubeColorRaycaster {
  private readonly colorCubeModeStore = useColorCubeModeStore();

  constructor(
    private readonly cube: IRubikCube,
    private readonly mouseTouchTracker: MouseTouchTracker,
  ) {
    super();
    this.camera = cube.camera;
  }

  public start(): void {
    window.addEventListener('mousedown', this.onMouseDownEventCallback);
    window.addEventListener('touchstart', this.onTouchStartEventCallback);
  }

  public stop(): void {
    window.removeEventListener('mousedown', this.onMouseDownEventCallback);
    window.removeEventListener('touchstart', this.onTouchStartEventCallback);
  }

  private onMouseDownEventCallback: (event: MouseEvent) => void = this.onMouseDown.bind(this);
  private onTouchStartEventCallback: (event: TouchEvent) => void = this.onMouseDown.bind(this);

  private onMouseDown(): void {
    if (
      !this.colorCubeModeStore.getIsColorCubeModeOn ||
      !this.colorCubeModeStore.getIsColorCubeModeColorOn
    ) {
      return;
    }
    const visibleFace = this.getIntersectionVisibleFace();
    const selectedMaterial = this.colorCubeModeStore.getSelectedMaterial;
    if (!visibleFace || !selectedMaterial) return;
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

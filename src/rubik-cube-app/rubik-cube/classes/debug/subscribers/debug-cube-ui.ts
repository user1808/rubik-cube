import type { DefaultRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IDebugModeSubscriber } from '@/rubik-cube-app/rubik-cube/interfaces/debug';
import type { IRubikCube } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import { CustomDebugGUI } from '@/rubik-cube-app/common/custom';
import { useEventBus } from '@vueuse/core';
import { useRotateCubeEventBus } from '@/event-buses/use-rotate-cube-event-bus';

export class DebugCubeUI implements IDebugModeSubscriber {
  private debugGUI: Nullable<CustomDebugGUI> = null;
  private cube: Nullable<IRubikCube> = null;
  private cubeFactory: Nullable<DefaultRubikCubeFactory> = null;

  private readonly rotateCubeEventBus = useEventBus(useRotateCubeEventBus);

  private isDebugMode: boolean = false;

  public onDebugModeChange(isDebugMode: boolean): void {
    this.isDebugMode = isDebugMode;
    if (isDebugMode) {
      this.prepareCubeRotationDebugUI();
    } else {
      this.debugGUI?.destroy();
    }
  }

  public setCube(cube: IRubikCube, cubeFactory: DefaultRubikCubeFactory): void {
    this.cube = cube;
    this.cubeFactory = cubeFactory;
    if (this.isDebugMode) this.prepareCubeRotationDebugUI();
  }

  private prepareCubeRotationDebugUI(): void {
    if (!this.cube || !this.cubeFactory) return;

    const cubeRotationGroups = Object.keys(this.cube.rotationGroups);
    const cubeRotationTypes = Object.keys(
      this.cubeFactory.createRubikCubeRotationData().rotationAngles,
    );
    const debugParams = {
      face: cubeRotationGroups[0],
      rotationType: cubeRotationTypes[0],
    };
    const debugFunctions = {
      rotation: () => {
        this.rotateCubeEventBus.emit({
          face: debugParams.face,
          type: debugParams.rotationType,
          source: 'interaction',
        });
      },
    };
    this.debugGUI = new CustomDebugGUI();
    this.debugGUI.add(debugParams, 'face', cubeRotationGroups).name('Face');
    this.debugGUI.add(debugParams, 'rotationType', cubeRotationTypes).name('Rotation Type');
    this.debugGUI.add(debugFunctions, 'rotation').name('Rotate Cube');
  }
}

import { toRaw } from 'vue';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { IDebugModeSubscriber } from '@/rubik-cube-app/rubik-cube/interfaces/debug';
import type { IRubikCube } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import { CustomDebugGUI } from '@/rubik-cube-app/common/custom';

type TCubeFactory = IRubikCubeFactory<Record<string, string>>;

export class DebugCubeUI implements IDebugModeSubscriber {
  private debugGUI: Nullable<CustomDebugGUI> = null;
  private cube: Nullable<IRubikCube> = null;
  private cubeFactory: Nullable<TCubeFactory> = null;

  private isDebugMode: boolean = false;

  public onDebugModeChange(isDebugMode: boolean): void {
    this.isDebugMode = isDebugMode;
    if (isDebugMode) {
      this.prepareCubeRotationDebugUI();
    } else {
      this.debugGUI?.destroy();
    }
  }

  public setCube(cube: IRubikCube, cubeFactory: TCubeFactory): void {
    this.cube = cube;
    this.cubeFactory = cubeFactory;
    if (this.isDebugMode) this.prepareCubeRotationDebugUI();
  }

  private prepareCubeRotationDebugUI(): void {
    if (!this.cube || !this.cubeFactory) return;

    const cubeRotationGroups = Object.keys(this.cube.rotationGroups);
    const cubeRotationTypes = Object.keys(
      this.cubeFactory.createRubikCubeRotationData().rotationTypesData,
    );
    const debugParams = {
      face: cubeRotationGroups[0],
      rotationType: cubeRotationTypes[0],
    };
    const debugFunctions = {
      rotation: () => {
        toRaw(this.cube)?.rotate(debugParams.face, debugParams.rotationType);
      },
    };
    this.debugGUI = new CustomDebugGUI();
    this.debugGUI.add(debugParams, 'face', cubeRotationGroups).name('Face');
    this.debugGUI.add(debugParams, 'rotationType', cubeRotationTypes).name('Rotation Type');
    this.debugGUI.add(debugFunctions, 'rotation').name('Rotate Cube');
  }
}

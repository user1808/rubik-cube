import type { Scene, PerspectiveCamera } from 'three';
import { Group } from 'three';
import type {
  IRubikCube,
  IRubikCubeFacesTexts,
  IRubikCubeShell,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type {
  TCubeFaces,
  TCubePieces,
  TRotationGroups,
  TRotationSource,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  IRubikCubeRotationImplementation,
  IRubikCubeRotationRaycaster,
} from '@/rubik-cube-app/rubik-cube/interfaces';
import { useRotateCubeEventBus } from '@/event-buses/use-rotate-cube-event-bus';
import { useEventBus, type Fn } from '@vueuse/core';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';
import type { IRubikCubeProperties } from '@/rubik-cube-app/rubik-cube/interfaces/structure/cube/rubik-cube';
import type { IRubikCubeColorRaycaster } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-color-raycaster';
import { useFacesLogicalValuesStore } from '@/stores/use-faces-logical-values-store';
import { useRotationFlagsStore } from '@/stores/use-rotation-flags-store';

export class RubikCube<
    TCubeCommonName extends TCubeCommonNames,
    TCubeFacesNames extends string,
    TCubeEdgeFacesNames extends string,
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellFilenames extends string,
  >
  extends Group
  implements
    IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
{
  private readonly facesLogicalValuesStore = useFacesLogicalValuesStore();
  private readonly rotationFlagsStore = useRotationFlagsStore();
  private readonly rotateCubeEventBus = useEventBus(useRotateCubeEventBus);
  private rotateCubeEventBusUnsubscribe: Nullable<Fn> = null;
  private _rotationRaycaster: Nullable<IRubikCubeRotationRaycaster> = null;

  private _colorRaycaster: Nullable<IRubikCubeColorRaycaster> = null;

  public isOnScene = false;

  constructor(
    public readonly properties: IRubikCubeProperties<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes
    >,
    public readonly scene: Scene,
    public readonly camera: PerspectiveCamera,
    public readonly shell: IRubikCubeShell<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
    public readonly pieces: TCubePieces<TCubeFacesNames>,
    public readonly faces: TCubeFaces<TCubeFacesNames>,
    public readonly rotationGroups: TRotationGroups<TCubeFacesNames, TCubeRotationGroups>,
    public readonly facesTexts: IRubikCubeFacesTexts,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {
    super();
    this.add(...pieces.map((piece) => piece.piece));
    this.add(shell);
    this.add(facesTexts);

    this.facesLogicalValuesStore.setFacesLogicalValues(
      this.properties.commonName,
      this.faces.logical,
    );
  }

  public setRotationRaycaster(raycaster: IRubikCubeRotationRaycaster) {
    this._rotationRaycaster = raycaster;
  }

  public setColorRaycaster(raycaster: IRubikCubeColorRaycaster) {
    this._colorRaycaster = raycaster;
  }

  public async rotate(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    source: TRotationSource,
  ): Promise<void> {
    if (this.rotationFlagsStore.getIsRotationPending || !this.isOnScene) return;
    if (source !== 'history' && this.rotationFlagsStore.getIsHistoryRotationPending) return;
    this.rotationFlagsStore.setIsRotationPending(true);

    await this.rotationImplementation.rotateRubikCubeGroup(
      this,
      rotationGroup,
      rotationType,
      source,
    );
    this.updateLogicalFaces();

    this.rotationFlagsStore.setIsRotationPending(false);
  }

  public addToScene(): void {
    if (!this.rotateCubeEventBusUnsubscribe) {
      this.rotateCubeEventBusUnsubscribe = this.rotateCubeEventBus.on(({ face, type, source }) => {
        this.rotate(face as TCubeRotationGroups, type as TCubeRotationTypes, source);
      });
    }
    this.facesTexts.prepare();
    this.scene.add(this);
    this._rotationRaycaster?.start();
    this._colorRaycaster?.start();
    this.isOnScene = true;
  }

  public removeFromScene(): void {
    this.pieces.forEach(({ piece }) => piece.dispose());
    this.shell.dispose();
    this.facesTexts.dispose();
    this.scene.remove(this);
    this._rotationRaycaster?.stop();
    this._colorRaycaster?.stop();
    this.isOnScene = false;
    if (this.rotateCubeEventBusUnsubscribe) {
      this.rotateCubeEventBusUnsubscribe();
      this.rotateCubeEventBusUnsubscribe = null;
    }
  }

  public updateLogicalFaces(): void {
    this.faces.logical = Object.entries<TCubePieces<TCubeFacesNames>>(this.faces.physical).reduce(
      (faces, [faceName, facePieces]) => {
        faces[faceName as TCubeFacesNames] = facePieces.map(
          (piece) => piece.piece.pieceCubeFacesColors[faceName as TCubeFacesNames],
        );
        return faces;
      },
      {} as TCubeFaces<TCubeFacesNames>['logical'],
    );
    this.facesLogicalValuesStore.setFacesLogicalValues(
      this.properties.commonName,
      this.faces.logical,
    );
  }
}

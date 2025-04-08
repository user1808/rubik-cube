import type { Scene, PerspectiveCamera } from 'three';
import { Group, Mesh } from 'three';
import type {
  IRubikCube,
  IRubikCubeFacesTexts,
  IRubikCubeShell,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type {
  TCubeFaces,
  TCubePieces,
  TRotationGroups,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  IRubikCubeRotationImplementation,
  IRubikCubeRotationRaycaster,
} from '@/rubik-cube-app/rubik-cube/interfaces';
import { useRotateCubeEventBus } from '@/event-buses/use-rotate-cube-event-bus';
import { useEventBus, type Fn } from '@vueuse/core';

export class RubikCube<
    TCubeFacesNames extends string,
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellFilenames extends string,
  >
  extends Group
  implements
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
{
  private readonly rotateCubeEventBus = useEventBus(useRotateCubeEventBus);
  private rotateCubeEventBusUnsubscribe: Fn;
  private _rotationRaycaster: Nullable<IRubikCubeRotationRaycaster> = null;
  private _rotationPending = false;

  public isOnScene = false;

  constructor(
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
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {
    super();
    this.add(...pieces.map((piece) => piece.piece));
    this.add(shell);
    this.add(facesTexts);

    this.rotateCubeEventBusUnsubscribe = this.rotateCubeEventBus.on(({ face, type }) => {
      this.rotate(face as TCubeRotationGroups, type as TCubeRotationTypes);
    });
  }

  public setRotationRaycaster(raycaster: IRubikCubeRotationRaycaster) {
    this._rotationRaycaster = raycaster;
  }

  public async rotate(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
  ): Promise<void> {
    if (this._rotationPending || !this.isOnScene) return;
    this._rotationPending = true;

    await this.rotationImplementation.rotateRubikCubeGroup(this, rotationGroup, rotationType);
    this.updateLogicalFaces();

    this._rotationPending = false;
  }

  public addToScene(): void {
    this.scene.add(this);
    this._rotationRaycaster?.start();
    this.isOnScene = true;
  }

  public removeFromScene(): void {
    this.pieces.forEach(({ piece }) => piece.dispose());
    this.shell.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    this.facesTexts.dispose();
    this.scene.remove(this);
    this._rotationRaycaster?.stop();
    this.isOnScene = false;
    this.rotateCubeEventBusUnsubscribe();
  }

  private updateLogicalFaces(): void {
    this.faces.logical = Object.entries<TCubePieces<TCubeFacesNames>>(this.faces.physical).reduce(
      (faces, [faceName, facePieces]) => {
        faces[faceName as TCubeFacesNames] = facePieces.map(
          (piece) => piece.piece.pieceCubeFacesColors[faceName as TCubeFacesNames],
        );
        return faces;
      },
      {} as TCubeFaces<TCubeFacesNames>['logical'],
    );
  }
}

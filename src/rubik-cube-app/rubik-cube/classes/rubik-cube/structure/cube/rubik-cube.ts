import type { Scene, PerspectiveCamera } from 'three';
import { Group, Mesh } from 'three';
import type { IRubikCube, IRubikCubeShell } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type {
  TCubeFaces,
  TCubePieces,
  TRotationGroups,
} from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type {
  IRubikCubeRotationImplementation,
  IRubikCubeRotationRaycaster,
} from '@/rubik-cube-app/rubik-cube/interfaces';

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
    this.scene.remove(this);
    this._rotationRaycaster?.stop();
    this.isOnScene = false;
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

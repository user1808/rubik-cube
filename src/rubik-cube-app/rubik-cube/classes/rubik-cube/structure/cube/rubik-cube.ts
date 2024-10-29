import * as THREE from 'three';
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
    TCubeShellPieces extends string,
  >
  extends THREE.Group
  implements IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  private _rotationRaycaster: Nullable<IRubikCubeRotationRaycaster> = null;
  private _rotationPending = false;

  public isOnScene = false;

  constructor(
    public readonly scene: THREE.Scene,
    public readonly camera: THREE.PerspectiveCamera,
    public readonly shell: IRubikCubeShell<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    public readonly pieces: TCubePieces<TCubeFacesNames>,
    public readonly faces: TCubeFaces<TCubeFacesNames>,
    public readonly rotationGroups: TRotationGroups<TCubeFacesNames, TCubeRotationGroups>,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ) {
    super();
    this.add(...pieces.map((piece) => piece.piece));
    this.add(...shell.children);
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
    this.pieces.forEach((piece) => piece.piece.dispose());
    this.shell.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
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

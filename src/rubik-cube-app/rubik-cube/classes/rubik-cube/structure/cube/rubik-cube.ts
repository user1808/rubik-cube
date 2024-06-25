import * as THREE from 'three';
import type { IRubikCubeRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-implementation';
import type { IRubikCube, IRubikCubeShell } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TCubePieces, TRotationGroups } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCube<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellPieces extends string,
  >
  extends THREE.Group
  implements IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  private _rotationPending = false;

  constructor(
    public readonly scene: THREE.Scene,
    public readonly shell: IRubikCubeShell<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    public readonly pieces: TCubePieces,
    public readonly rotationGroups: TRotationGroups<TCubeRotationGroups>,
    public readonly rotationTypes: Array<TCubeRotationTypes>,
    private readonly rotationImplementation: IRubikCubeRotationImplementation<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ) {
    super();
    this.add(...pieces.map((piece) => piece.piece));
    this.add(...shell.children);
  }

  public get rotationPending(): boolean {
    return this._rotationPending;
  }

  public async rotate(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
  ): Promise<void> {
    if (this._rotationPending) return;
    this._rotationPending = true;

    await this.rotationImplementation.rotateRubikCubeGroup(this, rotationGroup, rotationType);

    this._rotationPending = false;
  }

  public addToScene(): void {
    this.scene.add(this);
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
  }
}

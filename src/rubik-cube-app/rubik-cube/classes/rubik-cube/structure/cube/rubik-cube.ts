import * as THREE from 'three';
import type { IRubikCube } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube';
import type { IRubikCubeRotationData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-data';
import type { IRubikCubeRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubePieceWrapper } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece-wrapper';

/**
 * Class for the RubikCube class. Extends the THREE.Group class because it implements the IRubikCube interface, which extends the THREE.Group class.
 */
export class RubikCube<TCubeRotationGroups extends string, TCubeRotationTypes extends string>
  extends THREE.Group
  implements IRubikCube<TCubeRotationGroups, TCubeRotationTypes>
{
  private _rotationPending = false;

  constructor(
    private readonly _cubePieces: Array<IRubikCubePieceWrapper>,
    private readonly _cubeRotationGroups: Record<
      TCubeRotationGroups,
      Array<IRubikCubePieceWrapper>
    >,
    private readonly _cubeRotationData: IRubikCubeRotationData<
      TCubeRotationGroups,
      TCubeRotationTypes
    >,
    private readonly _cubeRotationImplementation: IRubikCubeRotationImplementation<
      TCubeRotationGroups,
      TCubeRotationTypes
    >,
  ) {
    super();
    this.add(..._cubePieces.map((piece) => piece.piece));
  }

  public get cubePieces(): Array<IRubikCubePieceWrapper> {
    return this._cubePieces;
  }
  public get cubeRotationGroups(): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>> {
    return this._cubeRotationGroups;
  }
  public get cubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes> {
    return this._cubeRotationData;
  }
  public get rotationPending(): boolean {
    return this._rotationPending;
  }
  public get cubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes
  > {
    return this._cubeRotationImplementation;
  }

  public async rotate(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    scene: THREE.Scene,
  ): Promise<void> {
    if (this._rotationPending) return;
    this._rotationPending = true;

    await this._cubeRotationImplementation.rotateRubikCubeGroup(
      rotationGroup,
      rotationType,
      this,
      scene,
    );

    this._rotationPending = false;
  }

  public dispose() {
    this._cubePieces.forEach((piece) => piece.piece.dispose());
  }
}

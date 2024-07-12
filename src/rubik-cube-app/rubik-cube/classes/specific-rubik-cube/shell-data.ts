import * as THREE from 'three';
import type { IRubikCubeShellData } from '../../interfaces/data';
import type { TShellPieceData, TShellRotationData } from '../../types/rubik-cube';

export abstract class AbstractRubikCubeShellData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
  TCubeShellDirections extends string,
  TCubeOrdinaryRotation extends TCubeRotationTypes,
  TCubeInvertedRotation extends TCubeRotationTypes,
> implements
    IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >
{
  protected abstract readonly ordinaryRotationName: TCubeOrdinaryRotation;
  protected abstract readonly invertedRotationName: TCubeInvertedRotation;
  protected abstract readonly directions: Record<TCubeShellDirections, THREE.Vector3>;

  public abstract readonly filename: TCubeShellFilename;
  public abstract readonly piecesData: Record<
    TCubeShellPieces,
    TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>
  >;

  protected createPieceRotationData(
    movements: Array<[TCubeShellDirections, TCubeRotationGroups, boolean?]>,
  ): Array<TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>> {
    return movements.flatMap(([directionIdx, rotationGroup, invert]) =>
      this.createRotationData(directionIdx, rotationGroup, invert),
    );
  }

  private createRotationData(
    direction: TCubeShellDirections,
    rotationGroup: TCubeRotationGroups,
    isInverted: boolean = false,
  ): [
    TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    TShellRotationData<TCubeRotationGroups, TCubeRotationTypes>,
  ] {
    const ordinaryDirection = this.directions[direction];
    return [
      {
        direction: ordinaryDirection,
        rotationType: isInverted ? this.invertedRotationName : this.ordinaryRotationName,
        rotationGroup,
      },
      {
        direction: ordinaryDirection.clone().negate(),
        rotationType: isInverted ? this.ordinaryRotationName : this.invertedRotationName,
        rotationGroup,
      },
    ];
  }
}

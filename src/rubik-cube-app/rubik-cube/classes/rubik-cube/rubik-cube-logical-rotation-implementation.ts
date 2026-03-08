import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';
import type { IRubikCubeRotationData } from '../../interfaces/data';

export class RubikCubeLogicalRotationImplementation<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  constructor(
    private readonly rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
  ) {}

  public rotateRubikCubeGroupLogical(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    logicalValues: TFaceLogicalValues<TCubeRotationGroups>,
  ): TFaceLogicalValues<TCubeRotationGroups> {
    const face = this.rotationData.rotationPiecesChangesPatterns[rotationType][rotationGroup];
    const ring = this.rotationData.rotationGroupsFaceChangesPatterns[rotationType][rotationGroup];

    const acc1: Array<number> = [
      ...ring[0][1]
        .map((idx) => logicalValues[ring[0][0]][idx])
        .filter((value) => typeof value === 'number'),
    ];
    const acc2: Array<number> = [];

    for (let i = 0; i < ring.length; i++) {
      acc2.splice(0, acc2.length, ...acc1);

      const nextMove = ring[(i + 1) % ring.length];
      const nextMoveValues = nextMove[1]
        .map((idx) => logicalValues[nextMove[0]][idx])
        .filter((value) => typeof value === 'number');

      acc1.splice(0, acc1.length, ...nextMoveValues);

      for (let j = 0; j < acc2.length; j++) {
        logicalValues[nextMove[0]][nextMove[1][j]] = acc2[j];
      }
    }

    const faceValuesCopy = [...logicalValues[rotationGroup]];
    for (const idx of face) {
      logicalValues[rotationGroup][idx] = faceValuesCopy[idx];
    }

    return logicalValues;
  }
}

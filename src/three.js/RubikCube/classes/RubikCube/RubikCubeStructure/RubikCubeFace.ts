import type { RubikCubePiece } from './RubikCubePiece';

export class RubikCubeFace<RotationTypes extends string> {
  constructor(private readonly _pieces: Array<RubikCubePiece>) {}

  public rotate(rotationType: RotationTypes): void {
    console.log(`Rotate Face ${rotationType}`);
  }
}

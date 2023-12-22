import * as THREE from 'three';
import type { TRubikCubePieceBasicData } from '../classes/RubikCube/RubikCubePiece/RubikCubePiece';

export type TRubikCubePieceIdx = number;

export interface IRubikCubeData<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
> {
  get basicDataOfAllCubePieces(): Array<TRubikCubePieceBasicData>;
  get initPiecesIdxsOfAllFaces(): Record<
    RealFacesNames | PseudoFacesNames,
    Array<TRubikCubePieceIdx>
  >;
  get initNormalsOfRealFaces(): Record<RealFacesNames, THREE.Vector3>;
}

import * as THREE from 'three';

export type TRubikCubePieceBasicData = Pick<THREE.Object3D, 'id' | 'position'>;
export type TRubikCubePieceId = TRubikCubePieceBasicData['id'];

export interface IRubikCubeData<
  RealFacesNames extends string,
  PseudoFacesNames extends string | never,
> {
  get cubeAllPiecesBasicData(): Array<TRubikCubePieceBasicData>;
  get cubeRealFacesPiecesIds(): Record<RealFacesNames, Array<TRubikCubePieceId>>;
  get cubePseudoFacesPiecesIds(): Record<PseudoFacesNames, Array<TRubikCubePieceId>>;
  get cubeRealFacesNormalVectors(): Record<RealFacesNames, THREE.Vector3>;
}

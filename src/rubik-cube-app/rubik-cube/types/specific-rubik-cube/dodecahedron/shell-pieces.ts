import type { TDodecahedronFaces } from './cube-faces';

export type TDodecahedronShellPieces = AddSuffix<TDodecahedronFaces, NumberRange<0, 10>>;

import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron4x4FacesData implements IRubikCubeFacesData<THexahedronFaces> {
  public readonly facesPiecesIdxs: Record<THexahedronFaces, Array<TPieceIdx>> = {
    Front: [12, 13, 14, 15, 24, 25, 26, 27, 36, 37, 38, 39, 52, 53, 54, 55],
    Back: [3, 2, 1, 0, 19, 18, 17, 16, 31, 30, 29, 28, 43, 42, 41, 40],
    Right: [15, 11, 7, 3, 27, 23, 21, 19, 39, 35, 33, 31, 55, 51, 47, 43],
    Left: [0, 4, 8, 12, 16, 20, 22, 24, 28, 32, 34, 36, 40, 44, 48, 52],
    Up: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    Down: [52, 53, 54, 55, 48, 49, 50, 51, 44, 45, 46, 47, 40, 41, 42, 43],
  };
}

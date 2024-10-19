import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron5x5FacesData implements IRubikCubeFacesData<THexahedronFaces> {
  public readonly facesPiecesIdxs: Record<THexahedronFaces, Array<TPieceIdx>> = {
    Front: [
      20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56, 68, 69, 70, 71, 72, 93, 94, 95,
      96, 97,
    ],
    Back: [
      4, 3, 2, 1, 0, 29, 28, 27, 26, 25, 45, 44, 43, 42, 41, 61, 60, 59, 58, 57, 77, 76, 75, 74, 73,
    ],
    Right: [
      24, 19, 14, 9, 4, 40, 35, 33, 31, 29, 56, 51, 49, 47, 45, 72, 67, 65, 63, 61, 97, 92, 87, 82,
      77,
    ],
    Left: [
      0, 5, 10, 15, 20, 25, 30, 32, 34, 36, 41, 46, 48, 50, 52, 57, 62, 64, 66, 68, 73, 78, 83, 88,
      93,
    ],
    Up: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    Down: [
      93, 94, 95, 96, 97, 88, 89, 90, 91, 92, 83, 84, 85, 86, 87, 78, 79, 80, 81, 82, 73, 74, 75,
      76, 77,
    ],
  };
}

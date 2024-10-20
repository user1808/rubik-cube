import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron3x3FacesData implements IRubikCubeFacesData<THexahedronFaces> {
  public readonly facesPiecesIdxs: Record<THexahedronFaces, Array<TPieceIdx>> = {
    Front: [6, 7, 8, 14, 15, 16, 23, 24, 25],
    Back: [2, 1, 0, 11, 10, 9, 19, 18, 17],
    Right: [8, 5, 2, 16, 13, 11, 25, 22, 19],
    Left: [0, 3, 6, 9, 12, 14, 17, 20, 23],
    Up: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    Down: [23, 24, 25, 20, 21, 22, 17, 18, 19],
  };
}

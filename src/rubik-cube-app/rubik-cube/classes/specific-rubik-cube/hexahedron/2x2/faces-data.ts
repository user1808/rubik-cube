import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';

export class RubikHexahedron2x2FacesData implements IRubikCubeFacesData<THexahedronFaces> {
  public readonly facesPiecesIdxs: Record<THexahedronFaces, Array<TPieceIdx>> = {
    Front: [2, 3, 6, 7],
    Back: [1, 0, 5, 4],
    Right: [3, 1, 7, 5],
    Left: [0, 2, 4, 6],
    Up: [0, 1, 2, 3],
    Down: [6, 7, 4, 5],
  };
}

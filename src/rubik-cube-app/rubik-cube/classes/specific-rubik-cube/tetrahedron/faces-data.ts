import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TPieceIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';

export class RubikTetrahedronFacesData implements IRubikCubeFacesData<TTetrahedronFaces> {
  public readonly facesPiecesIdxs: Record<TTetrahedronFaces, Array<TPieceIdx>> = {
    Front: [0, 1, 3, 10, 6, 9, 8, 5, 2],
    Right: [0, 1, 4, 12, 7, 11, 10, 6, 3],
    Left: [0, 1, 2, 8, 5, 13, 12, 7, 4],
    Down: [8, 5, 9, 10, 6, 11, 12, 7, 13],
  };
}

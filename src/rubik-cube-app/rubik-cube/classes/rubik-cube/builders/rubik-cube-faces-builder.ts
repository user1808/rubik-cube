import type { IRubikCubeFacesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeFacesData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { TCubePieces, TCubeFaces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeFacesBuilder<TCubeFacesNames extends string>
  implements IRubikCubeFacesBuilder<TCubeFacesNames>
{
  constructor(private readonly facesData: IRubikCubeFacesData<TCubeFacesNames>) {}

  public buildFaces(cubePieces: TCubePieces<TCubeFacesNames>): TCubeFaces<TCubeFacesNames> {
    const { facesPiecesIdxs } = this.facesData;
    return Object.entries<(typeof facesPiecesIdxs)[TCubeFacesNames]>(facesPiecesIdxs).reduce(
      (faces, [faceName, facesPiecesIdxs]) => {
        faces.physical[faceName as TCubeFacesNames] = facesPiecesIdxs.map((idx) => cubePieces[idx]);
        faces.logical[faceName as TCubeFacesNames] =
          faces.physical[faceName as TCubeFacesNames].map(
            (piece) => piece.piece.pieceCubeFacesColors[faceName as TCubeFacesNames],
          ) || [];
        return faces;
      },
      {
        physical: {} as TCubeFaces<TCubeFacesNames>['physical'],
        logical: {} as TCubeFaces<TCubeFacesNames>['logical'],
      } as TCubeFaces<TCubeFacesNames>,
    );
  }
}

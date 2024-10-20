import type { IRubikCubeFacesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { TCubePieces, TCubeFaces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeFacesBuilder<TCubeFacesNames extends string>
  implements IRubikCubeFacesBuilder<TCubeFacesNames>
{
  public buildFaces(cubePieces: TCubePieces): TCubeFaces<TCubeFacesNames> {
    throw new Error('Method not implemented.');
  }
}

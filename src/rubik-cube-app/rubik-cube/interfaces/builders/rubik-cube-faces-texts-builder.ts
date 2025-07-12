import type { IRubikCubeFacesTexts } from '../structure';

export interface IRubikCubeFacesTextsBuilder {
  buildFacesTexts(): Promise<IRubikCubeFacesTexts>;
}

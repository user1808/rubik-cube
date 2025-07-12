import type { Group } from 'three';

export interface IRubikCubeFacesTexts extends Group {
  prepare(): void;
  dispose(): void;
}

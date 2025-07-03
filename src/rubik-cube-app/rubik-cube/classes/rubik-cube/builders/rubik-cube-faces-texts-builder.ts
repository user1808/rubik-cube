import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { IRubikCubeFacesTextsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-faces-texts-builder';
import type { IRubikCubeFacesTexts } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import { TypeGuards } from '@/utils/type-guards';
import { Group } from 'three';
import { RubikCubeFacesTexts } from '../structure/helpers/rubik-cube-faces-texts';

export class RubikCubeFacesTextsBuilder<
  TCubeShellFilenames extends string,
  TCubeFacesTextsFilename extends string,
  TCubePiecesFilenames extends string,
> implements IRubikCubeFacesTextsBuilder
{
  constructor(
    private readonly gltfLoader: IRubikCubeGLTFLoader<
      TCubeShellFilenames,
      TCubePiecesFilenames,
      TCubeFacesTextsFilename
    >,
    private readonly facesTextsFilename: TCubeFacesTextsFilename,
  ) {}

  public async buildFacesTexts(): Promise<IRubikCubeFacesTexts> {
    const loadedGLTFFacesTexts = await this.gltfLoader.loadGLTFCubeFacesTexts(
      this.facesTextsFilename,
    );
    const gltfFacesTexts = loadedGLTFFacesTexts.scene;
    if (!gltfFacesTexts) throw new Error(`${this.facesTextsFilename} faces texts was not found`);
    if (!TypeGuards.isT(gltfFacesTexts, Group))
      throw new Error(`${this.facesTextsFilename} faces texts is not a group`);
    return new RubikCubeFacesTexts(gltfFacesTexts);
  }
}

import type { IRubikCubeFacesTexts } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import { useFacesHelperStateStore } from '@/stores/use-faces-helper-state-store';
import { storeToRefs } from 'pinia';
import { Group, Mesh } from 'three';

const facesHelperStateStore = useFacesHelperStateStore();
const { getIsFacesHelperVisible } = storeToRefs(facesHelperStateStore);

export class RubikCubeFacesTexts extends Group implements IRubikCubeFacesTexts {
  constructor(group: Group) {
    super();
    group.children.forEach((child) => {
      child.userData.ignoreRaycast = true;
    });
    this.add(...group.children);
    this.visible = getIsFacesHelperVisible.value;
    facesHelperStateStore.$subscribe(() => {
      this.visible = getIsFacesHelperVisible.value;
    });
  }

  public dispose(): void {
    this.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
}

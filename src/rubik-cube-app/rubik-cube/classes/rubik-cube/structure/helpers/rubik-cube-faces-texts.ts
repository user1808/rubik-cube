import { useFacesHelperEventBus } from '@/event-buses/use-faces-helper-event-bus';
import type { IRubikCubeFacesTexts } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import { useFacesHelperStore } from '@/stores/use-faces-helper-store';
import { useEventBus, type Fn } from '@vueuse/core';
import { Group, Mesh } from 'three';

export class RubikCubeFacesTexts extends Group implements IRubikCubeFacesTexts {
  private readonly facesHelperStore = useFacesHelperStore();
  private readonly facesHelperEventBus = useEventBus(useFacesHelperEventBus);
  private facesHelperEventBusUnsubscribe: Nullable<Fn> = null;

  constructor(group: Group) {
    super();
    group.children.forEach((child) => {
      child.userData.ignoreRaycast = true;
    });
    this.add(...group.children);
    this.visible = this.facesHelperStore.getIsFacesHelperVisible;
  }

  public prepare(): void {
    this.subscribeToFacesHelperEventBus();
  }

  public dispose(): void {
    this.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    this.unsubscribeFromFacesHelperEventBus();
  }

  private subscribeToFacesHelperEventBus(): boolean {
    if (this.facesHelperEventBusUnsubscribe !== null) return false;
    this.facesHelperEventBusUnsubscribe = this.facesHelperEventBus.on((event) => {
      switch (event) {
        case 'update-faces-helper-visibility':
          this.visible = this.facesHelperStore.getIsFacesHelperVisible;
          return;
        default:
          event satisfies never;
          return;
      }
    });
    return true;
  }

  private unsubscribeFromFacesHelperEventBus(): boolean {
    if (this.facesHelperEventBusUnsubscribe === null) return false;
    this.facesHelperEventBusUnsubscribe();
    this.facesHelperEventBusUnsubscribe = null;
    return true;
  }
}

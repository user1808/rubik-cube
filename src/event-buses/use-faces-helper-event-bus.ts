import type { EventBusKey } from '@vueuse/core';

type FacesHelperEvents = 'update-faces-helper-visibility';

export const useFacesHelperEventBus: EventBusKey<FacesHelperEvents> =
  Symbol('faces-helper-event-bus');

import type { EventBusKey } from '@vueuse/core';

type OrbitControlsEvents =
  | 'rotate-left'
  | 'rotate-right'
  | 'rotate-top'
  | 'rotate-bottom'
  | 'zoom-in'
  | 'zoom-out';

export const useOrbitControlsEventBus: EventBusKey<OrbitControlsEvents> = Symbol(
  'orbit-controls-event-bus',
);

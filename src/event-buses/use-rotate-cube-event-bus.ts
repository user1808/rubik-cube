import type { EventBusKey } from '@vueuse/core';

type RotateCubeEvents = {
  face: string;
  type: string;
};

export const useRotateCubeEventBus: EventBusKey<RotateCubeEvents> = Symbol('rotate-cube-event-bus');

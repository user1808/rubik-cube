import type { TRotationSource } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { EventBusKey } from '@vueuse/core';

type RotateCubeEvents = {
  face: string;
  type: string;
  source: TRotationSource;
};

export const useRotateCubeEventBus: EventBusKey<RotateCubeEvents> = Symbol('rotate-cube-event-bus');

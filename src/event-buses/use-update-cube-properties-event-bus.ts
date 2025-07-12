import type { EventBusKey } from '@vueuse/core';

type UpdateCubePropertiesEvents = 'update-cube-properties';

export const useUpdateCubePropertiesEventBus: EventBusKey<UpdateCubePropertiesEvents> = Symbol(
  'update-cube-properties-event-bus',
);

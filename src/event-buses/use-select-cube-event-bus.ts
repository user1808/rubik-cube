import type { EventBusKey } from '@vueuse/core';
import type { TCubeCommonNames } from '@/rubik-cube-app/rubik-cube/types/cube-common-name';

type SelectCubeEvents = {
  name: TCubeCommonNames;
};

export const useSelectCubeEventBus: EventBusKey<SelectCubeEvents> = Symbol('select-cube-event-bus');

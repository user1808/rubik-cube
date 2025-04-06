import type { EventBusKey } from '@vueuse/core';

type DraggableWindowEvents = 'reset-window-size';

export const useDraggableWindowEventBus: EventBusKey<DraggableWindowEvents> = Symbol(
  'draggable-window-event-bus',
);

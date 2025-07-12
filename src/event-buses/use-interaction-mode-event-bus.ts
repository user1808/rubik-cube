import type { EventBusKey } from '@vueuse/core';

type InteractionModeEvents = 'update-interaction-mode-controls';

export const useInteractionModeEventBus: EventBusKey<InteractionModeEvents> = Symbol(
  'interaction-mode-event-bus',
);

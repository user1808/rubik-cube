<template>
  <Transition
    :mode="mode"
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import type { BaseTransitionProps } from 'vue';

type BaseTransitionOpacityProps = {
  mode?: BaseTransitionProps['mode'];
};

defineProps<BaseTransitionOpacityProps>();
</script>

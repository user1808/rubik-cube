<template>
  <i
    class="pi text-[24px] text-white"
    :class="[icon]"
    :style="{ fontSize: `${size}px`, lineHeight: `${size}px` }"
  />
</template>

<script setup lang="ts">
type BasePrimeIconProps = {
  icon: `pi-${string}`;
  size?: number;
};
withDefaults(defineProps<BasePrimeIconProps>(), { size: 24 });
</script>

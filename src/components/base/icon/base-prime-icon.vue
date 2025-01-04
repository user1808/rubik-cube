<template>
  <i class="pi text-[24px] text-white" :class="[icon]" />
</template>

<script setup lang="ts">
type BasePrimeIconProps = {
  icon: `pi-${string}`;
};
defineProps<BasePrimeIconProps>();
</script>

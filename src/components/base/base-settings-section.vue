<template>
  <BaseDrawer :title="title"></BaseDrawer>
  <BaseDraggableWindow :title="title"></BaseDraggableWindow>
</template>

<script setup lang="ts">
import BaseDraggableWindow from './base-draggable-window.vue';
import BaseDrawer from './base-drawer.vue';

type BaseSettingsSectionProps = {
  title: string;
};
defineProps<BaseSettingsSectionProps>();
</script>

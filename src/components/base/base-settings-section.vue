<template>
  <BaseSideDrawer
    :title="title"
    :darkened="isSectionOpened && isMinimized"
    :enable-button-hold="isSectionOpened && isMinimized"
    v-model:open="isSectionOpened"
    v-model:minimize="isMinimized"
  >
    <template #content>
      <slot name="content" />
    </template>
  </BaseSideDrawer>
  <BaseDraggableWindow
    :title="title"
    class="max-md:hidden"
    v-model:open="isSectionOpened"
    v-model:minimize="isMinimized"
  >
    <template #content>
      <slot name="content" />
    </template>
  </BaseDraggableWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseDraggableWindow from './base-draggable-window.vue';
import BaseSideDrawer from './base-side-drawer.vue';

type BaseSettingsSectionProps = {
  title: string;
};
defineProps<BaseSettingsSectionProps>();

type BaseSettingsSectionSlots = {
  content(): any;
};
defineSlots<BaseSettingsSectionSlots>();

type IsSectionOpened = boolean;
const isSectionOpened = ref<IsSectionOpened>(false);

type IsMinimized = boolean;
const isMinimized = ref<IsMinimized>(false);
</script>

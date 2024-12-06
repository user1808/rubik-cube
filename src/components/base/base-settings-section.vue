<template>
  <BaseSideDrawer :title="title" :disabled="isWindowOpened" @minimize="openWindow" />
  <BaseDraggableWindow
    v-if="isWindowOpened"
    :title="title"
    @close-window="closeWindow"
    @lost-visibility="closeWindow"
    class="max-md:hidden"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseDraggableWindow from './base-draggable-window.vue';
import BaseSideDrawer from './base-side-drawer.vue';

type BaseSettingsSectionProps = {
  title: string;
};
defineProps<BaseSettingsSectionProps>();

type IsWindowOpened = boolean;
const isWindowOpened = ref<IsWindowOpened>(false);

const openWindow = () => (isWindowOpened.value = true);
const closeWindow = () => (isWindowOpened.value = false);
</script>

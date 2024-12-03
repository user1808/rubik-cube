<template>
  <UseDraggable
    class="fixed z-40 size-1/2 min-h-24 min-w-min max-w-full select-none resize overflow-auto rounded-md border border-gray-700 bg-black/75"
    :initial-value="{ x: windowWidth / 4, y: windowHeight / 4 }"
    :prevent-default="true"
    :handle="handle"
    @mousemove.stop
    @mousedown.stop
    @touchmove.stop
    @touchstart.stop
  >
    <div
      ref="handle"
      class="flex cursor-move flex-row items-center justify-between gap-x-4 bg-gray-800 px-4 py-2 text-white"
      v-element-visibility="onElementVisibility"
      @mousedown="console.log('onMouseDown')"
      @mouseup="onDragEnd"
      @touchend="onDragEnd"
    >
      <slot name="header">
        <span class="text-nowrap text-2xl font-bold leading-tight tracking-tight">
          {{ title }}
        </span>
        <BaseIconClose @click="$emit('closeWindow')" />
      </slot>
    </div>
    <div>
      <slot name="content" />
    </div>
  </UseDraggable>
</template>

<script setup lang="ts">
import BaseIconClose from './icon/base-icon-close.vue';
import { useWindowSize } from '@vueuse/core';
import { UseDraggable, vElementVisibility } from '@vueuse/components';
import { ref } from 'vue';

type BaseDraggableWindowProps = {
  title: string;
};
defineProps<BaseDraggableWindowProps>();

type BaseDraggableWindowEmits = {
  closeWindow: [];
  lostVisibility: [];
};
const emits = defineEmits<BaseDraggableWindowEmits>();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const handle = ref<HTMLElement | null>(null);

const isVisible = ref<boolean>(false);
const onElementVisibility = (state: boolean) => (isVisible.value = state);

const onDragEnd = () => {
  console.log('onDragEnd');
  if (!isVisible.value) emits('lostVisibility');
};
</script>

<style lang="css" scoped></style>

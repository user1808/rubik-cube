<template>
  <div class="flex flex-col gap-y-4">
    <BaseTransitionOpacity v-for="(section, idx) in sections" :key="idx">
      <div v-if="!isSideDrawerOpen">
        <PopoverButton
          class="flex w-full items-center gap-x-2 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 focus-visible:outline-none"
          @click="$emit('selectSection', section)"
        >
          <component v-if="section.icon" :is="section.icon" v-bind="section.iconBind" />
          <Transition :css="false" @enter="onSectionTitleEnter" @leave="onSectionTitleLeave">
            <span
              v-if="!isSectionTitleHidden"
              class="line-clamp-2 max-w-44 grow pr-2 text-left text-lg font-bold leading-tight tracking-tight text-white"
            >
              {{ section.title }}
            </span>
          </Transition>
        </PopoverButton>
      </div>
    </BaseTransitionOpacity>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { computed } from 'vue';
import type { BaseSettingsSection } from '../base-settings-section.type';
import { useOrbitControlsDataStore } from '@/stores/useOrbitControlsDataStore';
import { storeToRefs } from 'pinia';
import { PopoverButton } from '@headlessui/vue';
import BaseTransitionOpacity from '../../transition/base-transition-opacity.vue';

const store = useOrbitControlsDataStore();
const { getDistanceState } = storeToRefs(store);

type BaseSettingsSideDrawerButtonsProps = {
  isSideDrawerOpen: boolean;
  sections: Array<BaseSettingsSection>;
  hideTitle?: boolean;
};
const props = defineProps<BaseSettingsSideDrawerButtonsProps>();

type BaseSettingsSideDrawerButtonsEmits = {
  selectSection: [section: BaseSettingsSection];
};
defineEmits<BaseSettingsSideDrawerButtonsEmits>();

const isSectionTitleHidden = computed(() => {
  return getDistanceState.value === 'close' || !!props.hideTitle;
});

const onSectionTitleEnter = (el: Element, done: () => void) => {
  if (el.clientWidth === 0) {
    done();
    return;
  }
  gsap
    .timeline()
    .fromTo(el, { width: 0 }, { width: el.clientWidth + 1, duration: 0.2 })
    .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.1, onComplete: done });
};

const onSectionTitleLeave = (el: Element, done: () => void) => {
  gsap
    .timeline()
    .to(el, { opacity: 0, duration: 0.1 })
    .to(el, { width: 0, duration: 0.2, onComplete: done });
};
</script>

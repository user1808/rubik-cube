<template>
  <div class="bg-gray-900">
    <div class="relative flex flex-col">
      <div
        v-for="(section, idx) in sections"
        :key="idx"
        class="z-10 cursor-pointer p-2 hover:bg-gray-800/60"
        @click="selectSection(section)"
      >
        <component :is="section.icon" v-bind="section.iconBind" />
      </div>
      <div
        v-if="selectedSection"
        class="absolute inset-y-0 left-0 w-full bg-gray-800 transition-transform duration-200"
        :style="{
          height: sizeSelectedSectionBg,
          transform: `translateY(${translateYSelectedSectionBg})`,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRaw } from 'vue';
import type { BaseSettingsSection } from './base-settings-section.type';

const selectedSection = defineModel<BaseSettingsSection>('selectedSection');

type BaseSettingsSectionsProps = {
  sections: Array<BaseSettingsSection>;
};
const props = defineProps<BaseSettingsSectionsProps>();

const selectedSectionIndex = ref<number>(
  selectedSection.value ? props.sections.indexOf(toRaw(selectedSection.value)) : -1,
);

const selectSection = (section: BaseSettingsSection) => {
  selectedSection.value = section;
  selectedSectionIndex.value = props.sections.indexOf(toRaw(section));
};

const sizeSelectedSectionBg = computed(() => `${100 / props.sections.length}%`);
const translateYSelectedSectionBg = computed(() => `${100 * selectedSectionIndex.value}%`);
</script>

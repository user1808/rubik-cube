<template>
  <div class="mx-auto flex w-full flex-col gap-y-2 p-4 xs:gap-y-4">
    <h1 class="select-none text-xl tracking-tight text-white">Sections titles</h1>
    <div
      class="flex max-w-fit cursor-pointer items-center gap-x-4 px-1 py-2"
      @click.prevent="
        settingsStore.setIsSettingsSideDrawerSectionsTitlesAlwaysHidden(
          !getIsSettingsSideDrawerSectionsTitlesAlwaysHidden,
        )
      "
    >
      <Checkbox binary :model-value="getIsSettingsSideDrawerSectionsTitlesAlwaysHidden" />
      <span class="select-none text-pretty text-sm leading-4 text-gray-400">
        Always hide sections titles
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { useSettingsStore } from '@/stores/use-settings-store';
import { storeToRefs } from 'pinia';

const settingsStore = useSettingsStore();
const { getIsSettingsSideDrawerSectionsTitlesAlwaysHidden } = storeToRefs(settingsStore);
</script>

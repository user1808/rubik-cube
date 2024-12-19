<template>
  <BaseSettingsSideDrawer
    :sections="[{ title: 'Cube Settings' }, { title: 'General Settings' }, { title: 'More' }]"
  />
</template>

<script setup lang="ts">
import BaseSettingsSideDrawer from './base/settings/base-settings-side-drawer.vue';
</script>

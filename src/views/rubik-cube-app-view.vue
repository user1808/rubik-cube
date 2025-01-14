<template>
  <div>
    <RubikCubeSettings />
    <RubikCubeCanvas />
  </div>
</template>

<script setup lang="ts">
import RubikCubeCanvas from '@/components/rubik-cube-canvas.vue';
import RubikCubeSettings from '@/components/rubik-cube-settings.vue';
import { useHead } from '@unhead/vue';

useHead({
  title: 'Cube App',
  link: [
    {
      rel: 'author',
      href: 'https://github.com/user1808',
    },
  ],
  meta: [
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'description',
      content:
        'Cube App that allows you to play with a variety of cubes, including such as Ordinary Cube, Pyraminx and Megaminx.',
    },
  ],
});
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TitleBar from '@/components/title-bar/index.vue'
</script>

<template>
  <div class="container">
    <title-bar />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  width: 750px;
}
</style>

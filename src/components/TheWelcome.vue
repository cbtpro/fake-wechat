<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

</script>

<template>
  计数器 {{ counterStore.count }}
  <button @click="counterStore.increment">增加</button>
  <button @click="counterStore.reduce">减少</button>
</template>

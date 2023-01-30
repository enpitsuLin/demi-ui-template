<script setup lang="ts">
import { ref } from 'vue-demi'
const count = ref(0)
</script>
<template>
  <button class="button" @click="count++">
    <span>count {{ count }}</span>
  </button>
</template>

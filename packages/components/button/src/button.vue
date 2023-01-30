<script setup lang="ts">
import { buttonProps } from './button'
defineProps(buttonProps)
</script>
<script lang="ts">
export default {
  name: 'DButton',
}
</script>
<template>
  <button class="d-button" :class="`d-button--${type}`">
    <slot></slot>
  </button>
</template>

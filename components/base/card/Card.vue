<template>
  <v-card :elevation="elevation">
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    elevation: {
      type: Number || String,
      default: undefined,
    },
  },
})
</script>

<style scoped></style>

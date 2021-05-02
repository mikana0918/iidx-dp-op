<template>
  <div class="pa-2">
    <v-btn block @click="showModal()"> Login </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    showModal() {
      this.$emit('show-dialog', true)
    },
  },
})
</script>

<style></style>

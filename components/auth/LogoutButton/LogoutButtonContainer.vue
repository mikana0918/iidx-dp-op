<template>
  <div class="pa-2">
    <v-btn block> Logout </v-btn>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
})
</script>

<style></style>

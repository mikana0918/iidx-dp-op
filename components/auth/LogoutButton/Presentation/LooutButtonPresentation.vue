<template>
  <div class="pa-2">
    <v-btn block @click="signOut"> Logout </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    signOut() {
      this.$emit('sign-out')
    },
  },
})
</script>

<style></style>

<template>
  <v-list-item v-if="isAuthenticated" two-line>
    <v-list-item-avatar>
      <img :src="authUser.photoURL" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ authUser.displayName }}</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
    authUser: {
      type: Object,
      default: undefined,
      required: false,
    },
  },
})
</script>

<style></style>

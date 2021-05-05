<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close()"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    snackbar() {
      return this.$accessor.snackbar?.isShown
    },
    text(): string {
      return this.$accessor.snackbar?.text
    },
  },
  methods: {
    close() {
      this.$accessor.snackbar?.closeNotification()
    },
  },
})
</script>

<style scoped></style>

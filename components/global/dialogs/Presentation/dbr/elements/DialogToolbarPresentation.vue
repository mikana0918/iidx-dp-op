<template>
  <v-toolbar dark color="primary">
    <v-btn icon dark @click="toggleDialog()">
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <slot name="title"></slot>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn dark text @click="save()"> Save </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    save() {
      this.$logger.info(`clicked: save`)
      this.$emit('save')
    },
  },
})
</script>

<style scoped></style>

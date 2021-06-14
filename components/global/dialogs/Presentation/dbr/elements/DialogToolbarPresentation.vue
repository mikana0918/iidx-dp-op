<template>
  <v-toolbar dark color="primary">
    <Button icon dark color="white" @click="toggleDialog()">
      <v-icon>mdi-close</v-icon>
    </Button>

    <slot name="title"></slot>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <Button dark text color="white" @click="save()"> Save </Button>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/base/button/Button.vue'

export default Vue.extend({
  components: {
    Button,
  },
  methods: {
    toggleDialog() {
      this.$emit('close-dialog')
    },
    save() {
      this.$emit('save')
      this.$emit('close-dialog')
    },
  },
})
</script>

<style scoped></style>

<template>
  <div class="pa-2">
    <Button block color="accent" @click="signOut"> Logout </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/base/button/Button.vue'

export default Vue.extend({
  components: {
    Button,
  },
  methods: {
    signOut() {
      this.$emit('sign-out')
    },
  },
})
</script>

<style></style>
